// 键盘按键：把 Ctrl、S 这样的按键显示成键盘按键的样子，可在正文句子里直接使用
export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-xs font-medium shadow-sm">
      {children}
    </kbd>
  );
}
