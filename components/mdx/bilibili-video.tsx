// B 站视频嵌入：自适应宽度，默认播放最高清晰度（high_quality=1）
export function BilibiliVideo({
  bvid,
  title = "B 站视频",
}: {
  bvid: string;
  title?: string;
}) {
  return (
    <div className="my-6 aspect-video w-full overflow-hidden rounded-lg border border-border shadow-sm">
      <iframe
        src={`//player.bilibili.com/player.html?bvid=${bvid}&high_quality=1&danmaku=0`}
        title={title}
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
