"use client";

import { Children, isValidElement, useState } from "react";
import { cn } from "@/lib/utils";

type TabsItemProps = {
  label: string;
  children: React.ReactNode;
};

// 标签内容：只负责渲染，由 Tabs 决定显示哪一个
export function TabsItem({ children }: TabsItemProps) {
  return <div>{children}</div>;
}

// 标签页：点击顶部标签切换内容
export function Tabs({ children }: { children: React.ReactNode }) {
  const items = Children.toArray(children).filter(
    (child): child is React.ReactElement<TabsItemProps> =>
      isValidElement(child)
  );
  const [active, setActive] = useState(0);

  return (
    <div className="my-6">
      {/* 标签栏 */}
      <div
        role="tablist"
        className="flex flex-wrap gap-2 border-b border-border"
      >
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "-mb-px rounded-t-md border-b-2 px-4 py-2 text-sm font-medium transition-colors",
              i === active
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {item.props.label}
          </button>
        ))}
      </div>

      {/* 当前标签内容 */}
      <div className="pt-4">{items[active]}</div>
    </div>
  );
}
