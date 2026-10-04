import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blogs";
import { SITE_URL } from "@/lib/site";

// 网站地图：告诉搜索引擎站点有哪些页面（构建时生成 /sitemap.xml）
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...posts,
  ];
}
