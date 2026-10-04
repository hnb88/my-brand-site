"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FileText, Search, SearchX } from "lucide-react";
import type { BlogPost } from "@/lib/blogs";
import { cn } from "@/lib/utils";

// 每页最多显示的文章数
const PAGE_SIZE = 6;

// 6 种渐变色，按 蓝 → 紫 → 绿 → 橙 → 青 → 粉 循环分配
const CARD_GRADIENTS = [
  "from-blue-500 to-indigo-500",
  "from-violet-500 to-purple-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-amber-500",
  "from-cyan-500 to-sky-500",
  "from-pink-500 to-rose-500",
];

export function BlogSection({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");

  // 搜索过滤：标题、摘要、完整正文，不区分大小写；空关键词返回全部
  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q)
    );
  }, [posts, query]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));

  // 挂载后从 URL 的 ?page= 参数恢复页码（刷新保持当前页），只恢复一次
  // 静态 HTML 里默认渲染第 1 页，保证预渲染内容完整
  const restored = useRef(false);
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    const param = Number.parseInt(
      new URLSearchParams(window.location.search).get("page") ?? "1",
      10
    );
    const target = Number.isNaN(param) || param < 1 ? 1 : Math.min(param, totalPages);
    setPage(target);
    setPageInput(String(target));
  }, [totalPages]);

  // 切页时同步 URL 参数（可分享带页码的链接），replaceState 不触发整页刷新
  function updateUrl(target: number) {
    const url = new URL(window.location.href);
    if (target <= 1) url.searchParams.delete("page");
    else url.searchParams.set("page", String(target));
    window.history.replaceState(null, "", url.toString());
  }

  // 页码超出范围时收敛（与评价区分页一致）
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // 页码变化时同步输入框
  useEffect(() => {
    setPageInput(String(page));
  }, [page]);

  function goToPage(target: number) {
    const next = Math.min(Math.max(1, target), totalPages);
    setPage(next);
    updateUrl(next);
  }

  function commitPageInput() {
    const parsed = Number.parseInt(pageInput, 10);
    if (Number.isNaN(parsed)) {
      setPageInput(String(page));
      return;
    }
    goToPage(parsed);
  }

  // 输入关键词：结果从第 1 页开始展示，URL 页码同步归位
  function handleQueryChange(value: string) {
    setQuery(value);
    goToPage(1);
  }

  // 当前页的文章（搜索时只在搜索结果里翻页）
  const visiblePosts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
          <>
            {/* 搜索框：按标题、摘要、正文过滤 */}
            <div className="relative mx-auto mt-8 max-w-md">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="搜索文章..."
                aria-label="搜索文章"
                className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* 搜索结果为空 */}
            {filteredPosts.length === 0 ? (
              <div className="mt-12 flex flex-col items-center py-12 text-center">
                <SearchX
                  aria-hidden
                  className="h-12 w-12 text-muted-foreground/40"
                />
                <p className="mt-4 text-muted-foreground">没有找到相关文章</p>
              </div>
            ) : (
              <>
              <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {visiblePosts.map((post, i) => (
                <a
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group block overflow-hidden rounded-lg border bg-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* 顶部彩色渐变线：按全局顺序（跨页）循环分配颜色 */}
                  <span
                    aria-hidden
                    className={cn(
                      "block h-1 w-full bg-gradient-to-r",
                      CARD_GRADIENTS[
                        ((page - 1) * PAGE_SIZE + i) % CARD_GRADIENTS.length
                      ]
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

            {/* 分页：超过一页时显示（与客户评价区样式一致） */}
            {totalPages > 1 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-40"
                >
                  上一页
                </button>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  第
                  <input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={pageInput}
                    aria-label="跳转到指定页"
                    onChange={(e) => setPageInput(e.target.value)}
                    onBlur={commitPageInput}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitPageInput();
                    }}
                    className="h-9 w-14 rounded-md border border-input bg-background text-center text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  页，共 {totalPages} 页
                </div>

                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= totalPages}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-40"
                >
                  下一页
                </button>
              </div>
            )}
            </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
