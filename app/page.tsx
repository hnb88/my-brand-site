import { Books } from "@/components/books";
import { Cases } from "@/components/cases";
import { Hero } from "@/components/hero";
import { ReviewForm } from "@/components/review-form";
import { ReviewList } from "@/components/review-list";
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* 评价列表 */}
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              客户评价
            </h2>
            <p className="mt-3 text-muted-foreground">听听合作过的客户怎么说</p>
          </div>
          <div className="mt-12">
            <ReviewList />
          </div>

          {/* 评价表单 */}
          <div className="mt-24 text-center md:mt-32">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              留下你的评价
            </h2>
            <p className="mt-3 text-muted-foreground">你的反馈对我很重要</p>
          </div>
          <div className="mt-12">
            <ReviewForm />
          </div>
        </div>
      </section>
    </main>
  );
}
