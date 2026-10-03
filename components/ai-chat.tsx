"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { Bot, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const QUICK_QUESTIONS = ["你能提供哪些服务？", "如何购买你的图书？"];

export function AiChat() {
  const [open, setOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    error,
    reload,
  } = useChat({ api: "/api/chat" });

  // 新消息到达时自动滚动到底部
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // 收起状态：右下角悬浮按钮（放在"返回顶部"按钮上方）
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-50 flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        <Bot className="h-5 w-5" />
        AI 客服
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="AI 客服"
      className="fixed bottom-24 right-4 z-50 flex h-[min(34rem,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:right-6"
    >
      {/* 头部 */}
      <div className="flex items-center gap-3 bg-brand-gradient px-4 py-3.5 text-white">
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20"
        >
          <Bot className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold">AI 客服</p>
          <p className="truncate text-xs text-white/70">
            DeepSeek 驱动 · 随时为你解答
          </p>
        </div>
        <button
          type="button"
          aria-label="关闭客服窗口"
          onClick={() => setOpen(false)}
          className="ml-auto rounded-md p-1.5 transition-colors hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* 消息区 */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {/* 空状态：欢迎语 + 快捷提问 */}
        {messages.length === 0 && (
          <div>
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-muted px-4 py-2.5 text-sm leading-relaxed">
              你好呀！我是韩老师网站的 AI 客服，有什么可以帮你的吗？😊
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => append({ role: "user", content: q })}
                  className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex",
              m.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                m.role === "user"
                  ? "rounded-br-md bg-primary text-primary-foreground"
                  : "rounded-bl-md bg-muted"
              )}
            >
              {m.parts.map((part, i) =>
                part.type === "text" ? <span key={i}>{part.text}</span> : null
              )}
              {/* 打字机光标：AI 逐字回复时闪烁 */}
              {isLoading &&
                m.role === "assistant" &&
                m === messages[messages.length - 1] && (
                  <span
                    aria-hidden
                    className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-primary align-text-bottom"
                  />
                )}
            </div>
          </div>
        ))}

        {/* 失败提示 */}
        {error && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-destructive/10 px-4 py-2.5 text-sm leading-relaxed text-destructive">
              抱歉，AI 客服暂时开小差了，请稍后再试
              <button
                type="button"
                onClick={() => reload()}
                className="ml-2 font-medium underline underline-offset-2"
              >
                重试
              </button>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 输入区 */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-border p-3"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="输入你的问题……"
          aria-label="输入问题"
          className="h-10 flex-1"
        />
        <Button
          type="submit"
          size="icon"
          aria-label="发送"
          disabled={isLoading || !input.trim()}
          className="h-10 w-10 shrink-0 rounded-full"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
