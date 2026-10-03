const services = [
  {
    icon: "💻",
    name: "软件开发",
    description:
      "企业官网、移动 App、小程序、桌面应用，从需求到上线全流程交付",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: "🎓",
    name: "软件培训",
    description: "AI 编程、全栈开发、团队技术培训，零基础也能快速上手",
    gradient: "from-violet-500 to-fuchsia-400",
  },
  {
    icon: "🧭",
    name: "技术咨询",
    description: "架构设计、技术选型、性能优化，一对一解决技术难题",
    gradient: "from-orange-500 to-amber-400",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 bg-background py-20 md:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* 标题 */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            我的服务
          </h2>
          <p className="mt-3 text-muted-foreground">专业可靠，让你的想法落地</p>
        </div>

        {/* 服务卡片 */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="group overflow-hidden rounded-xl bg-card shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* 顶部渐变条 */}
              <div
                aria-hidden
                className={`h-1 w-full bg-gradient-to-r ${service.gradient}`}
              />
              <div className="flex flex-col items-center p-8 text-center">
                <span
                  aria-hidden
                  className="text-5xl transition-transform duration-500 group-hover:scale-110"
                >
                  {service.icon}
                </span>
                <h3 className="mt-5 text-xl font-bold">{service.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
