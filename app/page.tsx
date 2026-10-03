import { Cases } from "@/components/cases";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <main>
      {/* 主视觉区 */}
      <Hero />

      {/* 技能区 */}
      <Skills />

      {/* 服务区 */}
      <Services />

      {/* 案例区 */}
      <Cases />

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
