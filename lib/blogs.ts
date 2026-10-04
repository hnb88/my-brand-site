import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string; // 文件名（不含扩展名），文章的唯一标识
  title: string;
  date: string;
  summary: string;
};

export type BlogPostFull = BlogPost & {
  content: string; // 正文 MDX 源码，详情页用 next-mdx-remote 渲染
};

// 文章目录：public/blogs（必须提交到 git，Vercel 构建时才能读取）
const BLOGS_DIR = path.join(process.cwd(), "public", "blogs");

// 读取目录下所有 .mdx 文章，按日期倒序（最新在前）
export function getAllPosts(): BlogPost[] {
  let files: string[];
  try {
    files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith(".mdx"));
  } catch {
    return []; // 目录不存在时视为没有文章
  }

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOGS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title ?? "",
        date: data.date ?? "",
        summary: data.summary ?? "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 读取单篇文章：frontmatter 信息 + 完整正文内容
export function getPostBySlug(slug: string): BlogPostFull | null {
  try {
    const raw = fs.readFileSync(path.join(BLOGS_DIR, `${slug}.mdx`), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      summary: data.summary ?? "",
      content,
    };
  } catch {
    return null; // 文章不存在
  }
}
