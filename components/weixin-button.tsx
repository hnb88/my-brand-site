"use client";

import { useEffect, useRef, useState } from "react";

export function WeixinButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 点击按钮外部区域关闭二维码卡片（Esc 键也可关闭）
  useEffect(() => {
    if (!open) return;

    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref}>
      {/* 微信按钮：logo 图片裁成圆形直接做按钮，悬浮列最顶部 */}
      <button
        type="button"
        aria-label="微信联系"
        onClick={() => setOpen((prev) => !prev)}
        className="group fixed bottom-[9.5rem] right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        <img
          src="/weixin/weixin-logo.png"
          alt=""
          aria-hidden
          className="h-full w-full rounded-full object-cover"
        />

        {/* 悬停提示 */}
        <span
          role="tooltip"
          className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-slate-900/90 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100 dark:bg-white/95 dark:text-slate-900"
        >
          微信联系
        </span>
      </button>

      {/* 二维码卡片：点击按钮弹出，点击外部区域关闭 */}
      {open && (
        <div
          role="dialog"
          aria-label="微信二维码"
          className="fixed bottom-[9.5rem] right-20 z-50 w-60 rounded-xl border border-border bg-card p-4 shadow-2xl"
        >
          <p className="text-center text-sm font-semibold">微信：nb199829</p>
          <img
            src="/weixin/weixin-qr.png"
            alt="微信二维码"
            className="mt-3 w-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
