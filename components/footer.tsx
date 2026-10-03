"use client";

import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer id="footer" className="bg-slate-900 py-10">
      {/* 版权信息 */}
      <p className="text-center text-sm text-white/50">
        © 2026 MyBrandSite. All rights reserved.
      </p>

      {/* 返回顶部按钮 */}
      <button
        type="button"
        aria-label="返回顶部"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
