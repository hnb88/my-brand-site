const skills = [
  { icon: "🤖", name: "AI 开发" },
  { icon: "📜", name: "仓颉开发" },
  { icon: "🌌", name: "鸿蒙开发" },
  { icon: "🌐", name: "网站开发" },
  { icon: "📱", name: "小程序开发" },
  { icon: "🏗️", name: "架构设计" },
  { icon: "⚡", name: "性能优化" },
  { icon: "🎓", name: "技术培训" },
];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 bg-card py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* 标题 */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            技能专长
          </h2>
          <p className="mt-3 text-muted-foreground">多年积累，全栈覆盖</p>
        </div>

        {/* 技能标签 */}
        <ul className="mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {skills.map((skill) => (
            <li
              key={skill.name}
              className="group flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-base font-medium text-primary transition-transform duration-300 hover:scale-105 md:px-6 md:text-lg"
            >
              <span
                aria-hidden
                className="inline-block text-xl transition-transform duration-300 group-hover:scale-110 md:text-2xl"
              >
                {skill.icon}
              </span>
              {skill.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
