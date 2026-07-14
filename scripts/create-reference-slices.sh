#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE="$ROOT/docs/source-of-truth/reference/pmagic-ai-original.png"
OUTPUT_DIR="$ROOT/docs/source-of-truth/reference/slices"

mkdir -p "$OUTPUT_DIR"

# name:start_y:height. The slices are full width (2876 px), non-overlapping,
# and cover the 8752 px source from top to bottom exactly once.
SLICES=(
  "00-navbar:0:250"
  "01-hero:250:1320"
  "02-primary-metrics:1570:650"
  "03-problem-cards:2220:750"
  "04-agent-architecture:2970:1300"
  "05-intelligent-modules:4270:1060"
  "06-case-study:5330:1240"
  "07-whitepapers:6570:1170"
  "08-closing-cta:7740:590"
  "09-footer:8330:422"
)

for spec in "${SLICES[@]}"; do
  IFS=: read -r name start_y height <<< "$spec"
  output="$OUTPUT_DIR/$name.png"

  # sips treats an exact zero crop offset as “center crop” and rejects a crop
  # touching the far edge. Sub-pixel epsilon values select the explicit-offset
  # path while still rounding to the intended integer pixel rectangle.
  crop_y="$start_y"
  if [[ "$start_y" -eq 0 ]]; then
    crop_y="0.01"
  elif [[ $((start_y + height)) -eq 8752 ]]; then
    crop_y="$((start_y - 1)).99"
  fi

  sips \
    --cropToHeightWidth "$height" 2876 \
    --cropOffset "$crop_y" 0.01 \
    "$SOURCE" \
    --out "$output" >/dev/null
done

echo "Generated ${#SLICES[@]} reference slices in $OUTPUT_DIR"
