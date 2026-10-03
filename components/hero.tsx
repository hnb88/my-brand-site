import Image from "next/image";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-700"
    >
      {/* 星云光斑（呼吸效果） */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 animate-hero-breathe rounded-full bg-[#5B6AF0] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 h-[28rem] w-[28rem] animate-hero-breathe rounded-full bg-[#8B5CF6] blur-3xl [animation-delay:1.5s]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 animate-hero-breathe rounded-full bg-[#6366F1] blur-3xl [animation-delay:3s]"
      />

      {/* 内容 */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        {/* 头像：渐变光环 + 上下浮动 */}
        <div className="animate-hero-rise">
          <div className="animate-hero-float">
            <div className="rounded-full bg-brand-gradient p-1.5 shadow-[0_0_40px_rgba(139,92,246,0.55),0_0_90px_rgba(91,106,240,0.4)]">
              <Image
                src="/avatar/me.jpg"
                alt="韩老师的头像"
                width={160}
                height={160}
                priority
                className="h-32 w-32 rounded-full object-cover md:h-40 md:w-40"
              />
            </div>
          </div>
        </div>

        {/* 名字：白色到浅蓝渐变 */}
        <h1 className="mt-8 animate-hero-rise bg-gradient-to-b from-white to-blue-200 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent [animation-delay:200ms] md:text-6xl">
          韩老师的品牌站
        </h1>

        {/* 一句话介绍 */}
        <p className="mt-4 animate-hero-rise text-base text-sky-200/70 [animation-delay:400ms] md:text-lg">
          专注软件开发和培训，帮你把想法变成产品
        </p>
      </div>
    </section>
  );
}
