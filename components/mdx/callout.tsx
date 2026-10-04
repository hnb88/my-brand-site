import { Info, Lightbulb, TriangleAlert, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// 四种提示框：蓝色说明、紫色技巧、黄色警告、绿色成功
const STYLES = {
  info: {
    icon: Info,
    box: "border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    iconColor: "text-blue-500",
  },
  tip: {
    icon: Lightbulb,
    box: "border-purple-500/40 bg-purple-500/10 text-purple-700 dark:text-purple-300",
    iconColor: "text-purple-500",
  },
  warning: {
    icon: TriangleAlert,
    box: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    iconColor: "text-amber-500",
  },
  success: {
    icon: CircleCheck,
    box: "border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-300",
    iconColor: "text-green-500",
  },
} as const;

export type CalloutType = keyof typeof STYLES;

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}) {
  const { icon: Icon, box, iconColor } = STYLES[type];

  return (
    <div className={cn("my-6 rounded-lg border p-4", box)}>
      {title && (
        <div className="flex items-center gap-2 font-semibold">
          <Icon aria-hidden className={cn("h-4 w-4 shrink-0", iconColor)} />
          <span>{title}</span>
        </div>
      )}
      {/* 用 div 包裹，避免 MDX 的 <p> 嵌套 */}
      <div className="mt-1.5 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
