"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { href: "/#hero", label: "首页" },
  { href: "/#skills", label: "技能" },
  { href: "/#services", label: "服务" },
  { href: "/#cases", label: "案例" },
  { href: "/#books", label: "图书" },
  { href: "/#reviews", label: "评价" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* 网站名称 */}
        <a
          href="/#hero"
          className="text-xl font-extrabold tracking-tight text-primary"
        >
          MyBrandSite
        </a>

        {/* 桌面端导航链接 */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* 移动端菜单按钮 */}
        <button
          type="button"
          aria-label="打开菜单"
          onClick={() => setOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* 移动端菜单面板 */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-72">
          <SheetTitle className="sr-only">导航菜单</SheetTitle>
          <nav className="mt-8 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
