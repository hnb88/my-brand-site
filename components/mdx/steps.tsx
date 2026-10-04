import { Children, cloneElement, isValidElement } from "react";

type StepProps = {
  index?: number; // 由 Steps 自动传入
  isLast?: boolean; // 由 Steps 自动传入
  title: string;
  children: React.ReactNode;
};

// 单个步骤：编号圆圈 + 标题 + 说明，步骤之间由连接线串起来
export function Step({ index, isLast, title, children }: StepProps) {
  return (
    <li className="relative flex gap-4">
      {/* 左侧：编号圆圈 + 连接线 */}
      <div className="flex flex-col items-center">
        <span
          aria-hidden
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white"
        >
          {index}
        </span>
        {!isLast && <span aria-hidden className="mt-2 w-px flex-1 bg-border" />}
      </div>

      <div className="pb-6">
        <h4 className="text-base font-semibold">{title}</h4>
        {/* 用 div 包裹，避免 MDX 的 <p> 嵌套 */}
        <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </li>
  );
}

// 步骤卡片：带编号的步骤展示
export function Steps({ children }: { children: React.ReactNode }) {
  const items = Children.toArray(children).filter(
    (child): child is React.ReactElement<StepProps> => isValidElement(child)
  );

  return (
    <ol className="my-6 list-none space-y-0 p-0">
      {items.map((child, i) =>
        cloneElement(child, { index: i + 1, isLast: i === items.length - 1 })
      )}
    </ol>
  );
}
