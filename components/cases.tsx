import Image from "next/image";

const cases = [
  {
    image: "/cases/case-restaurant.jpg",
    name: "某餐饮品牌官网",
    description: "为本地连锁餐厅开发的品牌展示网站",
  },
  {
    image: "/cases/case-desktop.jpg",
    name: "团队协作桌面工具",
    description: "任务看板、文件共享、即时通讯，支持 Windows/macOS/Linux",
  },
  {
    image: "/cases/case-extension.jpg",
    name: "SmartTab AI 网页助手",
    description: "Chrome 插件，选中即翻译、一键总结、智能问答",
  },
  {
    image: "/cases/case-harmonyos.jpg",
    name: "智慧出行鸿蒙 App",
    description: "路线规划、实时公交、多设备协同",
  },
  {
    image: "/cases/case-mobile.jpg",
    name: "生活记账 App",
    description:
      "收支记录、分类统计、预算管理（Android/iOS/微信小程序/抖音小程序 四端覆盖）",
  },
  {
    image: "/cases/case-openclaw.jpg",
    name: "OpenClaw AI 助手",
    description: "基于 OpenClaw 的智能助手，本地运行，隐私优先",
  },
];

export function Cases() {
  return (
    <section id="cases" className="scroll-mt-20 bg-card py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* 标题 */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            项目案例
          </h2>
          <p className="mt-3 text-muted-foreground">
            用作品说话，每一个项目都用心交付
          </p>
        </div>

        {/* 案例卡片 */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <div
              key={item.name}
              className="group overflow-hidden rounded-xl bg-background shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* 案例截图 */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
