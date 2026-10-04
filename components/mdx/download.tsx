import { Download as DownloadIcon } from "lucide-react";

// 文件下载按钮：带图标，显示文件名和大小
// 文件放在 public/pdf 目录下，链接地址是 /pdf/ 加文件名
export function Download({
  name,
  size,
}: {
  name: string;
  size?: string;
}) {
  return (
    <a
      href={`/pdf/${name}`}
      download
      className="my-4 inline-flex items-center gap-3 rounded-lg border border-border bg-muted px-4 py-3 transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <DownloadIcon aria-hidden className="h-5 w-5 shrink-0 text-primary" />
      <span className="text-sm font-medium">{name}</span>
      {size && (
        <span className="text-xs text-muted-foreground">（{size}）</span>
      )}
    </a>
  );
}
