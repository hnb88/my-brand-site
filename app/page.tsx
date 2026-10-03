import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main>
      {/* 主视觉区 */}
      <Hero />

      {/* 技能区 */}
      <section
        id="skills"
        className="flex min-h-[60vh] scroll-mt-20 items-center justify-center border-t"
      >
        <h2 className="text-3xl font-bold text-primary">技能区</h2>
      </section>

      {/* 服务区 */}
      <section
        id="services"
        className="flex min-h-[60vh] scroll-mt-20 items-center justify-center border-t"
      >
        <h2 className="text-3xl font-bold text-primary">服务区</h2>
      </section>

      {/* 案例区 */}
      <section
        id="cases"
        className="flex min-h-[60vh] scroll-mt-20 items-center justify-center border-t"
      >
        <h2 className="text-3xl font-bold text-primary">案例区</h2>
      </section>

      {/* 图书区 */}
      <section
        id="books"
        className="flex min-h-[60vh] scroll-mt-20 items-center justify-center border-t"
      >
        <h2 className="text-3xl font-bold text-primary">图书区</h2>
      </section>

      {/* 评价区 */}
      <section
        id="reviews"
        className="flex min-h-[60vh] scroll-mt-20 items-center justify-center border-t"
      >
        <h2 className="text-3xl font-bold text-primary">评价区</h2>
      </section>
    </main>
  );
}
