"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

// 深色模式切换按钮：浅色显示太阳，深色显示月亮，点击切换
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 挂载后再渲染图标，避免服务端/客户端主题不一致导致水合报错
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const nextLabel = mounted ? (resolvedTheme === "dark" ? "切换到浅色" : "切换到深色") : "切换主题";

  return (
    <button
      type="button"
      aria-label={nextLabel}
      title={nextLabel}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {!mounted ? (
        /* 未挂载时占位，避免图标闪跳 */
        <span aria-hidden className="h-5 w-5" />
      ) : isDark ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}
