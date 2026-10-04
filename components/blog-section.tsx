import { FileText } from "lucide-react";
import { getAllPosts } from "@/lib/blogs";
import { cn } from "@/lib/utils";

// 6 种渐变色，按 蓝 → 紫 → 绿 → 橙 → 青 → 粉 循环分配
const CARD_GRADIENTS = [
  "from-blue-500 to-indigo-500",
  "from-violet-500 to-purple-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-amber-500",
  "from-cyan-500 to-sky-500",
  "from-pink-500 to-rose-500",
];

export function BlogSection() {
  const posts = getAllPosts();

  return (
    <section id="blog" className="scroll-mt-20 bg-background py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* 标题 */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            技术博客
          </h2>
          <p className="mt-3 text-muted-foreground">记录技术与成长的每一步</p>
        </div>

        {/* 文章列表：没有文章时显示占位 */}
        {posts.length === 0 ? (
          <div className="mt-12 flex flex-col items-center py-12 text-center">
            <FileText
              aria-hidden
              className="h-12 w-12 text-muted-foreground/40"
            />
            <p className="mt-4 text-muted-foreground">暂无文章，敬请期待</p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {posts.map((post, i) => (
              <a
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group block overflow-hidden rounded-lg border bg-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* 顶部彩色渐变线：按顺序循环分配颜色 */}
                <span
                  aria-hidden
                  className={cn(
                    "block h-1 w-full bg-gradient-to-r",
                    CARD_GRADIENTS[i % CARD_GRADIENTS.length]
                  )}
                />

                <div className="p-5">
                  <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                    {post.title}
                  </h3>

                  {/* 日期 + 预计阅读时长（每分钟 500 字） */}
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <time>{post.date}</time>
                    <span aria-hidden>·</span>
                    <span>约 {post.readingMinutes} 分钟阅读</span>
                  </div>

                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.summary}
                  </p>

                  {/* 悬停时显示"阅读全文 →" */}
                  <span className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    阅读全文
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
