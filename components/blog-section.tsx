import { getAllPosts } from "@/lib/blogs";

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

        {/* 文章列表：没有文章时显示占位文字 */}
        {posts.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">暂无文章</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blogs/${post.slug}.mdx`}
                className="group block rounded-lg border bg-muted p-5 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold transition-colors duration-500 group-hover:text-primary">
                  {post.title}
                </h3>
                <time className="mt-2 block text-xs text-muted-foreground">
                  {post.date}
                </time>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.summary}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
