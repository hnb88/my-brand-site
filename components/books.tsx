import Image from "next/image";

const books = [
  {
    cover: "/books/book-cangjie-tujie1.png",
    name: "《图解仓颉编程：基础篇》",
    link: "https://www.epubit.com/bookDetails?id=UB88c66222d7866",
  },
  {
    cover: "/books/book-cangjie-tujie2.png",
    name: "《图解仓颉编程：高级篇》",
    link: "https://www.epubit.com/bookDetails?id=UB88c6694b7a67f",
  },
  {
    cover: "/books/book-cangjie-kuaisu.png",
    name: "《仓颉编程快速上手》",
    link: "https://www.epubit.com/bookDetails?id=UB88c64805b0439",
  },
  {
    cover: "/books/book-harmonyos-kuaisu.png",
    name: "《鸿蒙原生应用开发：ArkTS语言快速上手》",
    link: "https://www.epubit.com/bookDetails?id=UB88c64fabd7daf",
  },
  {
    cover: "/books/book-harmonyos-shizhan.png",
    name: "《鸿蒙应用开发实战》",
    link: "https://www.epubit.com/bookDetails?id=UB7812f8a7377b2",
  },
];

export function Books() {
  return (
    <section
      id="books"
      className="scroll-mt-20 bg-background py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* 标题 */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            图书展示
          </h2>
          <p className="mt-3 text-muted-foreground">技术沉淀，用文字传递知识</p>
        </div>

        {/* 图书卡片 */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
          {books.map((book) => (
            <a
              key={book.name}
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg border bg-muted p-3 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-lg"
            >
              {/* 封面（3:4，悬停显示购买按钮） */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-md">
                <Image
                  src={book.cover}
                  alt={book.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="rounded-full bg-white/25 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                    点击购买
                  </span>
                </div>
              </div>

              {/* 书名 */}
              <h3 className="mt-3 line-clamp-2 text-sm font-medium transition-colors duration-500 group-hover:text-primary">
                {book.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
