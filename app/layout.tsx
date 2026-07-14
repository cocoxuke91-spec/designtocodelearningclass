import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pmagic AI｜建工领域专属的超级工程大脑",
  description: "以多 Agent 协同架构打通采购、过磅、BIM、财务与企业微信协同。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

