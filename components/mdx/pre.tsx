"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

// 代码块：悬停时右上角出现「复制」按钮，点击一键复制代码
// 通过 components 映射的 pre 组件，对所有代码块生效
export function Pre({
  children,
  ...props
}: React.ComponentProps<"pre">) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  async function handleCopy() {
    const text = preRef.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 非安全上下文或旧浏览器：用 execCommand 兜底
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="group/pre relative">
      <pre ref={preRef} {...props}>
        {children}
      </pre>

      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "absolute right-2 top-2 z-10 flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-slate-300 opacity-0 transition-opacity duration-200 backdrop-blur-sm hover:bg-white/20 hover:text-white focus:opacity-100 group-hover/pre:opacity-100",
          copied && "text-green-400"
        )}
      >
        {copied ? (
          <>
            <Check aria-hidden className="h-3.5 w-3.5" />
            已复制
          </>
        ) : (
          <>
            <Copy aria-hidden className="h-3.5 w-3.5" />
            复制
          </>
        )}
      </button>
    </div>
  );
}
