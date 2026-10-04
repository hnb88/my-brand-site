// 引用卡片：大字引用 + 署名，左侧品牌色竖线
export function Quote({
  author,
  children,
}: {
  author?: string;
  children: React.ReactNode;
}) {
  return (
    <blockquote className="my-6 border-l-4 border-primary pl-5">
      {/* 用 div 包裹，避免 MDX 的 <p> 嵌套 */}
      <div className="text-lg font-medium leading-relaxed md:text-xl">
        {children}
      </div>
      {author && (
        <footer className="mt-3 text-sm text-muted-foreground">
          —— {author}
        </footer>
      )}
    </blockquote>
  );
}
