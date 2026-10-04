"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { Bot, Loader2, Send, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AiChat() {
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    stop,
    setMessages,
  } = useChat({ api: "/api/chat" });

  // 新消息到达时自动滚动到底部
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  // 关闭后再次打开：立即定位到底部，显示最新聊天记录
  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open]);

  // 清空对话：先停掉正在生成的回复，再清空聊天记录
  function handleClear() {
    stop();
    setMessages([]);
  }

  return (
    <>
      {/* 圆形聊天按钮：悬浮列中间（返回顶部在下、微信在上），点击展开、再点收起 */}
      <button
        type="button"
        aria-label={open ? "收起 AI 客服" : "展开 AI 客服"}
        onClick={() => setOpen((prev) => !prev)}
        className="group fixed bottom-24 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        {open ? (
          /* 打开时显示 × */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          /* 关闭时显示对话气泡 */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
        )}

        {/* 悬停提示 */}
        <span
          role="tooltip"
          className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-slate-900/90 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100 dark:bg-white/95 dark:text-slate-900"
        >
          AI 助手
        </span>
      </button>

      {/* 对话窗口：固定在右下角，位于按钮上方 */}
      {open && (
        <div
          role="dialog"
          aria-label="AI 客服"
          className="fixed bottom-[13rem] right-4 z-50 flex h-[min(32rem,calc(100vh-14.5rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:right-6"
        >
          {/* 头部 */}
          <div className="flex items-center gap-3 bg-brand-gradient px-4 py-3.5 text-white">
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20"
            >
              <Bot className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">AI 客服</p>
              <p className="truncate text-xs text-white/70">
                DeepSeek 驱动 · 随时为你解答
              </p>
            </div>

            {/* 清空对话：有消息时才显示 */}
            {messages.length > 0 && (
              <button
                type="button"
                aria-label="清空对话"
                title="清空对话"
                onClick={handleClear}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-white/20"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}

            {/* 关闭窗口 */}
            <button
              type="button"
              aria-label="关闭 AI 客服"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* 消息列表：用户靠右（蓝色），AI 靠左（灰色） */}
          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-muted px-4 py-2.5 text-sm leading-relaxed">
                  我是韩老师的 AI 助手，有什么可以帮你的？
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
                    part.type === "text" ? (
                      <span key={i}>{part.text}</span>
                    ) : null
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
          </div>

          {/* 输入区：输入框 + 发送按钮 */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="输入你的问题..."
              aria-label="输入问题"
              className="h-10 flex-1"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="h-10 shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  思考中...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  发送
                </>
              )}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
