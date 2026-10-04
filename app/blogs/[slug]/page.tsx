import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import { MdxContent } from "@/components/mdx/mdx-content";
import { getAllPosts, getPostBySlug } from "@/lib/blogs";

type Props = {
  params: { slug: string };
};

// 构建时生成所有文章页（文章都提交在 git 里，新文章推送后重新构建即可）
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// 未生成的路径直接 404，避免访问不存在的文章
export const dynamicParams = false;

export function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | HyBrandsite`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  // 服务端预编译 MDX，客户端直接渲染（支持传入互动组件）
  const mdxSource = await serialize(post.content);

  return (
    <div>
      {/* Hero Banner：与首页一致的深色蓝紫渐变 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-700 py-16 md:py-24">
        {/* 星云光斑 */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#5B6AF0] opacity-40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#8B5CF6] opacity-40 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          {/* 文章标题 */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {post.title}
          </h1>

          {/* 日期 + 阅读时长 */}
          <div className="mt-5 flex items-center justify-center gap-3 text-sm text-sky-200/80">
            <time>{post.date}</time>
            <span aria-hidden className="text-white/30">
              ·
            </span>
            <span>阅读时长约 {post.readingMinutes} 分钟</span>
          </div>
        </div>
      </section>

      {/* 正文：白色背景 + prose 精致排版 */}
      <article className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-blockquote:rounded-r-lg prose-blockquote:border-l-primary prose-blockquote:bg-muted prose-blockquote:py-1 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-foreground">
            <MdxContent source={mdxSource} />
          </div>

          {/* 返回博客列表 */}
          <div className="mt-12 border-t border-border pt-6">
            <a
              href="/#blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:underline"
            >
              ← 返回博客列表
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
