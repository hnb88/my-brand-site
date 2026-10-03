# MyBrand 项目说明

个人品牌网站，用于展示技能、服务、项目案例、图书、客户评价，并提供 AI 客服和博客功能。

## 技术栈

- Next.js 14.2.18 — 不要升级到 15，保持 14.2.x
- TypeScript
- Tailwind CSS v3（tailwindcss@^3.4.1）— 不要升级到 v4
- shadcn/ui（基于 Radix UI）— 必须用 shadcn@2 生成组件，不能用 @latest 或 @4
- Supabase — 存储客户评价数据（@supabase/supabase-js v2）
- Vercel AI SDK ai@4 + @ai-sdk/openai@1 — 见下方重要说明
- MDX — 博客文章（next-mdx-remote@6 + gray-matter，锁定 v6，不要升级到其他大版本）

## ⚠️ shadcn/ui 版本（必读）

添加组件必须用 shadcn@2，绝对不能用 @latest 或 @4。

命令示例：npx shadcn@2 add button

原因：shadcn v4 生成 Tailwind CSS v4 代码（@import "shadcn/tailwind.css"、@theme、@custom-variant 等语法），和项目使用的 Tailwind v3 不兼容，会报错 "The border-border class does not exist"。

同理，运行时依赖也要用 v3 兼容版本：
- 用 @radix-ui/react-slot（不是统一包 radix-ui）
- 用 tailwindcss-animate（不是 tw-animate-css）

## ⚠️ AI SDK 版本（必读）

必须使用 ai@4 + @ai-sdk/openai@1，绝对不能升级到 v6。

原因：DeepSeek 只支持 /chat/completions 接口，ai@6 改用了 /responses 接口，会报 404 Not Found。

"ai": "^4.3.19",
"@ai-sdk/openai": "^1.3.24"

## ⚠️ API 路由运行时（必读）

app/api/chat/route.ts 必须使用 Node.js Runtime（默认），不能加 export const runtime = "edge"。

原因：路由在模块初始化时用 fs.readFileSync 读取 public/ai/ai-knowledge.md，Edge Runtime 不支持 fs。

必须保留：export const maxDuration = 60; // 防止 Vercel 超时

## ⚠️ 深色模式（next-themes）

使用 next-themes 实现深色/浅色/跟随系统切换，有两个不能动的配置：

1. tailwind.config.ts 中必须保留 darkMode: ["class"]，删掉则 dark: 前缀全部失效
2. app/layout.tsx 的 <html> 标签必须保留 suppressHydrationWarning，删掉则每次刷新页面控制台报水合错误

深色模式样式统一用 Tailwind 的 dark: 前缀，不要用 JS 判断主题后动态设置样式。

## 目录约定

public/ai/        # AI 知识库（ai-knowledge.md），已提交到 git
public/blogs/     # MDX 博客文章
components/mdx/   # 自定义 MDX 组件（Callout、Tabs、Accordion、Steps、Pre、BilibiliVideo、Quote、Kbd、Diff、Timeline、Download）
components/
  blog-list.tsx   # 博客列表客户端组件（搜索 + 分页，"use client"）
public/
  avatar/         # 头像（me.jpg）
  weixin/         # 微信 logo（weixin-logo.png）、微信二维码（weixin-qr.png）
  books/          # 图书封面图片
  cases/          # 项目案例截图
  pdf/            # 可下载的 PDF 文件

public/ai/ 目录必须提交到 git，否则 Vercel 部署时 fs.readFileSync 会报 ENOENT 错误。

## ⚠️ MDX 组件水合错误（必读）

自定义 MDX 组件不能用 <p> 包裹 children。

原因：MDX 渲染多行文本时会自动在外层套一层 <p>，如果组件再用 <p> 包裹，就变成 <p><p>...</p></p>，非法 HTML 嵌套导致 React 水合报错（刷新页面时出现，客户端导航时不报错）。

正确：用 <div> 包裹 children
错误：用 <p> 包裹 children

## 环境变量

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DEEPSEEK_API_KEY=

本地存在 .env.local，Vercel 部署需在后台 Settings → Environment Variables 手动配置，配置后需 Redeploy 才生效。

## Supabase 数据表

表名：reviews

字段：id（int8，主键自增）、name（text，评价者姓名）、content（text，评价内容）、
rating（int2，评分 1-5）、approved（bool，是否显示，默认 false）、created_at（timestamptz）

RLS 策略：SELECT 只查询 approved = true 的记录；INSERT 允许匿名提交（approved 不由前端设置）。
