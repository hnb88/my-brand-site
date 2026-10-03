"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "mybrand-review-submitted";

type Status = "idle" | "submitting" | "success" | "error";

export function ReviewForm() {
  const [checked, setChecked] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    rating?: string;
    content?: string;
  }>({});
  const [status, setStatus] = useState<Status>("idle");

  // 检查浏览器本地是否已有"已评价"记录
  useEffect(() => {
    setHasSubmitted(localStorage.getItem(STORAGE_KEY) === "true");
    setChecked(true);
  }, []);

  function validate() {
    const nextErrors: typeof errors = {};
    if (!name.trim()) {
      nextErrors.name = "请填写你的姓名";
    } else if (name.trim().length < 2 || name.trim().length > 20) {
      nextErrors.name = "姓名需 2-20 个字";
    }
    if (rating === 0) {
      nextErrors.rating = "请选择评分";
    }
    if (!content.trim()) {
      nextErrors.content = "请填写评价内容";
    } else if (content.trim().length < 10 || content.trim().length > 500) {
      nextErrors.content = "评价内容需 10-500 个字";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!validate()) return;

    setStatus("submitting");
    try {
      // approved 不由前端设置，默认 false，需审核后才对外显示
      const { error } = await supabase.from("reviews").insert({
        name: name.trim(),
        rating,
        content: content.trim(),
      });
      if (error) throw error;

      localStorage.setItem(STORAGE_KEY, "true");
      setStatus("success");
      // 1 秒后刷新页面，刷新后显示"已评价"提示
      setTimeout(() => window.location.reload(), 1000);
    } catch {
      setStatus("error");
    }
  }

  if (!checked) return null;

  // 已提交过评价：显示感谢提示，不显示表单
  if (hasSubmitted) {
    return (
      <div className="mx-auto w-full max-w-xl overflow-hidden rounded-xl bg-card shadow-sm border border-border">
        <div aria-hidden className="h-1 w-full bg-brand-gradient" />
        <p className="px-8 py-14 text-center text-lg text-muted-foreground">
          感谢你的评价！你已经提交过评价了
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl overflow-hidden rounded-xl bg-card shadow-sm border border-border">
      {/* 顶部蓝紫渐变装饰线 */}
      <div aria-hidden className="h-1 w-full bg-brand-gradient" />

      <form onSubmit={handleSubmit} noValidate className="space-y-6 p-6 sm:p-8">
        {/* 姓名 */}
        <div className="space-y-2">
          <Label htmlFor="review-name">姓名</Label>
          <Input
            id="review-name"
            value={name}
            maxLength={20}
            placeholder="怎么称呼你？"
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        {/* 评分 */}
        <div className="space-y-2">
          <Label>评分</Label>
          <div
            className="flex items-center gap-1"
            onMouseLeave={() => setHoverRating(0)}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`${n} 星`}
                onMouseEnter={() => setHoverRating(n)}
                onClick={() => {
                  setRating(n);
                  if (errors.rating)
                    setErrors((prev) => ({ ...prev, rating: undefined }));
                }}
                className="rounded p-0.5 transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    "h-7 w-7 transition-colors",
                    (hoverRating || rating) >= n
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  )}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm font-medium text-yellow-500">
                {rating} 分
              </span>
            )}
          </div>
          {errors.rating && (
            <p className="text-sm text-destructive">{errors.rating}</p>
          )}
        </div>

        {/* 评价内容 */}
        <div className="space-y-2">
          <Label htmlFor="review-content">评价内容</Label>
          <Textarea
            id="review-content"
            value={content}
            maxLength={500}
            rows={5}
            placeholder="说说我们合作过程中的感受吧……"
            onChange={(e) => {
              setContent(e.target.value);
              if (errors.content)
                setErrors((prev) => ({ ...prev, content: undefined }));
            }}
          />
          <p className="text-right text-xs text-muted-foreground">
            {content.length}/500
          </p>
          {errors.content && (
            <p className="text-sm text-destructive">{errors.content}</p>
          )}
        </div>

        {/* 提交按钮 */}
        <div className="space-y-3">
          {status === "success" ? (
            <p className="py-2 text-center font-medium text-green-500">
              评价提交成功！
            </p>
          ) : (
            <Button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-600 hover:to-violet-600 hover:shadow-xl disabled:pointer-events-none disabled:opacity-60"
            >
              {status === "submitting" ? "提交中..." : "提交评价"}
            </Button>
          )}
          {status === "error" && (
            <p className="text-center text-sm text-destructive">
              提交失败，请重试
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
