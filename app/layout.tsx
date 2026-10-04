import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import "./globals.css";
import { AiChat } from "@/components/ai-chat";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { WeixinButton } from "@/components/weixin-button";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  // 让相对路径的 OG 图片等元数据解析成绝对 URL
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    // 子页面标题自动拼上站点名，如 "文章标题 | MyBrandSite"
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI编程",
    "仓颉开发",
    "鸿蒙开发",
    "软件开发",
    "小程序开发",
    "技术培训",
    "技术咨询",
  ],
  // 微信、QQ 等平台分享链接时展示的标题和描述
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "zh_CN",
    images: [
      {
        url: "/avatar/me.jpg",
        width: 160,
        height: 160,
        alt: "韩老师的头像",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/avatar/me.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning：主题切换会在 <html> 上增删 class，避免水合报错
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Umami 访问统计：隐私友好的分析工具，defer 不阻塞页面渲染 */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="963727e5-b8ce-456f-9d30-5b6703f8af6d"
          defer
        />

        {/* 主题切换：默认跟随系统，用户选择存在 localStorage */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <AiChat />
          <WeixinButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
