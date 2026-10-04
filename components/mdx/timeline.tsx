import { Children, isValidElement } from "react";

type TimelineItemProps = {
  time: string;
  title: string;
  children: React.ReactNode;
};

// 时间轴节点：时间、标题、说明
export function TimelineItem({ time, title, children }: TimelineItemProps) {
  return (
    <li className="relative">
      {/* 节点圆点：压在竖线上 */}
      <span
        aria-hidden
        className="absolute -left-[1.9rem] top-1 h-3 w-3 rounded-full bg-brand-gradient ring-4 ring-background"
      />
      <div className="text-xs font-semibold text-primary">{time}</div>
      <h4 className="mt-0.5 text-base font-semibold">{title}</h4>
      {/* 用 div 包裹，避免 MDX 的 <p> 嵌套 */}
      <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </li>
  );
}

// 时间轴：竖向时间线，适合展示学习路径、项目历程
export function Timeline({ children }: { children: React.ReactNode }) {
  const items = Children.toArray(children).filter(
    (child): child is React.ReactElement<TimelineItemProps> =>
      isValidElement(child)
  );

  return (
    <ol className="my-6 ml-2 list-none space-y-6 border-l-2 border-border pl-6">
      {items}
    </ol>
  );
}
