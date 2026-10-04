"use client";

export function Footer() {
  return (
    <footer id="footer" className="bg-slate-900 py-10">
      {/* 版权信息 */}
      <p className="text-center text-sm text-white/50">
        © 2026 MyBrandSite. All rights reserved.
      </p>

      {/* 返回顶部按钮：悬浮列最底部 */}
      <button
        type="button"
        aria-label="返回顶部"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="group fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
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
          <path d="m5 12 7-7 7 7" />
          <path d="M12 19V5" />
        </svg>

        {/* 悬停提示 */}
        <span
          role="tooltip"
          className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-slate-900/90 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100 dark:bg-white/95 dark:text-slate-900"
        >
          返回顶部
        </span>
      </button>
    </footer>
  );
}
