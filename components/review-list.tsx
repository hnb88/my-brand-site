"use client";

import { useEffect, useState } from "react";
import { Loader2, MessageSquare, Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

// 6 种渐变色，按 蓝 → 紫 → 绿 → 橙 → 青 → 粉 循环分配
const AVATAR_GRADIENTS = [
  "from-blue-500 to-indigo-500",
  "from-violet-500 to-purple-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-amber-500",
  "from-cyan-500 to-sky-500",
  "from-pink-500 to-rose-500",
];

type Review = {
  id: number;
  name: string;
  content: string;
  rating: number;
  created_at: string;
};

function formatDate(iso: string) {
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // 拉取当前页：只取审核通过的，最新排在前面
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    supabase
      .from("reviews")
      .select("*", { count: "exact" })
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .range(from, to)
      .then(({ data, error, count }) => {
        if (cancelled) return;
        setLoading(false);
        if (error) {
          console.error("获取评价失败：", error.message);
          return;
        }
        setReviews((data ?? []) as Review[]);
        setTotal(count ?? 0);
      });

    return () => {
      cancelled = true;
    };
  }, [page]);

  // 页码超出范围时收敛到最后一页（如数据被删除后）
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
    setPage(Math.min(Math.max(1, target), totalPages));
  }

  function commitPageInput() {
    const parsed = Number.parseInt(pageInput, 10);
    if (Number.isNaN(parsed)) {
      setPageInput(String(page));
      return;
    }
    goToPage(parsed);
  }

  return (
    <div>
      {loading ? (
        /* 加载动画 */
        <div
          className="flex justify-center py-16"
          role="status"
          aria-label="评价加载中"
        >
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : reviews.length === 0 ? (
        /* 暂无评价 */
        <div className="flex flex-col items-center py-16 text-center">
          <MessageSquare
            aria-hidden
            className="h-12 w-12 text-muted-foreground/40"
          />
          <p className="mt-4 text-muted-foreground">
            暂无评价，来做第一个评价的人吧！
          </p>
        </div>
      ) : (
        /* 评价卡片：电脑两列，手机一列 */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {reviews.map((review, i) => {
            // 按全局顺序（跨页）循环分配渐变色
            const gradient =
              AVATAR_GRADIENTS[
                ((page - 1) * PAGE_SIZE + i) % AVATAR_GRADIENTS.length
              ];
            return (
              <article
                key={review.id}
                className="overflow-hidden rounded-xl border border-border bg-background shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* 顶部渐变装饰线（与头像同色） */}
                <div
                  aria-hidden
                  className={cn("h-1 w-full bg-gradient-to-r", gradient)}
                />
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    {/* 渐变圆形头像：取姓名第一个字 */}
                    <div
                      aria-hidden
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold text-white",
                        gradient
                      )}
                    >
                      {review.name.trim().charAt(0) || "客"}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">{review.name}</h3>
                      {/* 金色星星评分 */}
                      <div
                        className="mt-1 flex items-center gap-0.5"
                        role="img"
                        aria-label={`${review.rating} 星`}
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            aria-hidden
                            className={cn(
                              "h-4 w-4",
                              n <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground/30"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <time className="ml-auto shrink-0 text-xs text-muted-foreground">
                      {formatDate(review.created_at)}
                    </time>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {review.content}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* 分页：超过一页时显示 */}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1 || loading}
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
            disabled={page >= totalPages || loading}
            className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            下一页
          </button>
        </div>
      )}
    </div>
  );
}
