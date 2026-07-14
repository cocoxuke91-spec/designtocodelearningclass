import AVFoundation
import CoreGraphics
import CoreVideo
import Foundation
import ImageIO

guard CommandLine.arguments.count >= 4 else {
    fatalError("Usage: gif-to-mp4.swift input.gif output.mp4 fps")
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2])
let fps = Int32(CommandLine.arguments[3]) ?? 16

guard let source = CGImageSourceCreateWithURL(inputURL as CFURL, nil),
      CGImageSourceGetCount(source) > 0,
      let firstImage = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
    fatalError("Unable to read input GIF")
}

let width = firstImage.width
let height = firstImage.height
try? FileManager.default.removeItem(at: outputURL)

let writer = try AVAssetWriter(outputURL: outputURL, fileType: .mp4)
let settings: [String: Any] = [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: width,
    AVVideoHeightKey: height,
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: 8_000_000,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
    ],
]

let input = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
input.expectsMediaDataInRealTime = false
let attributes: [String: Any] = [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferWidthKey as String: width,
    kCVPixelBufferHeightKey as String: height,
]
let adaptor = AVAssetWriterInputPixelBufferAdaptor(
    assetWriterInput: input,
    sourcePixelBufferAttributes: attributes
)

guard writer.canAdd(input) else { fatalError("Unable to add writer input") }
writer.add(input)
guard writer.startWriting() else { fatalError("Unable to start writer") }
writer.startSession(atSourceTime: .zero)

let colorSpace = CGColorSpaceCreateDeviceRGB()
let frameCount = CGImageSourceGetCount(source)

for index in 0..<frameCount {
    while !input.isReadyForMoreMediaData {
        Thread.sleep(forTimeInterval: 0.002)
    }

    guard let image = CGImageSourceCreateImageAtIndex(source, index, nil) else { continue }
    var pixelBuffer: CVPixelBuffer?
    let status = CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &pixelBuffer)
    guard status == kCVReturnSuccess, let buffer = pixelBuffer else {
        fatalError("Unable to create pixel buffer")
    }

    CVPixelBufferLockBaseAddress(buffer, [])
    let context = CGContext(
        data: CVPixelBufferGetBaseAddress(buffer),
        width: width,
        height: height,
        bitsPerComponent: 8,
        bytesPerRow: CVPixelBufferGetBytesPerRow(buffer),
        space: colorSpace,
        bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue
    )!
    context.draw(image, in: CGRect(x: 0, y: 0, width: width, height: height))
    CVPixelBufferUnlockBaseAddress(buffer, [])

    let time = CMTime(value: Int64(index), timescale: fps)
    guard adaptor.append(buffer, withPresentationTime: time) else {
        fatalError("Unable to append frame \(index)")
    }
}

input.markAsFinished()
await writer.finishWriting()
guard writer.status == .completed else {
    fatalError(writer.error?.localizedDescription ?? "Video writer failed")
}
