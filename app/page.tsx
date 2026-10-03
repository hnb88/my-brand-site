import { Books } from "@/components/books";
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
      <Books />

      {/* 评价区 */}
      <section id="reviews" className="scroll-mt-20 bg-card py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              客户评价
            </h2>
            <p className="mt-3 text-muted-foreground">真实反馈，见证每次合作</p>
          </div>
          <div className="mt-12 flex items-center justify-center rounded-xl border-2 border-dashed border-border py-16">
            <p className="text-lg text-muted-foreground">🚧 即将上线</p>
          </div>
        </div>
      </section>
    </main>
  );
}
