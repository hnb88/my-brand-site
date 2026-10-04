import { cn } from "@/lib/utils";

// 代码对比：并排展示修改前/后，删除的行红色、新增的行绿色
export function Diff({ before, after }: { before: string; after: string }) {
  const beforeLines = before.split("\n");
  const afterLines = after.split("\n");

  return (
    <div className="my-6 grid gap-4 md:grid-cols-2">
      <DiffPane
        label="修改前"
        lines={beforeLines}
        otherLines={afterLines}
        kind="removed"
      />
      <DiffPane
        label="修改后"
        lines={afterLines}
        otherLines={beforeLines}
        kind="added"
      />
    </div>
  );
}

function DiffPane({
  label,
  lines,
  otherLines,
  kind,
}: {
  label: string;
  lines: string[];
  otherLines: string[];
  kind: "removed" | "added";
}) {
  const other = new Set(otherLines);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-slate-900 font-mono text-xs">
      <div className="border-b border-white/10 px-3 py-2 font-sans text-slate-400">
        {label}
      </div>
      <div className="overflow-x-auto p-3 leading-relaxed text-slate-200">
        {lines.map((line, i) => {
          const changed = !other.has(line);
          return (
            <div
              key={i}
              className={cn(
                "-mx-2 rounded px-2 whitespace-pre",
                changed &&
                  (kind === "removed"
                    ? "bg-red-500/20 text-red-300"
                    : "bg-green-500/20 text-green-300")
              )}
            >
              {line || " "}
            </div>
          );
        })}
      </div>
    </div>
  );
}
