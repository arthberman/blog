import type { MetadataRoute } from "next";

import { getAllArticles } from "@/lib/blog-data";
import { siteConfig } from "@/lib/site-config";

const sitemap = (): MetadataRoute.Sitemap => {
  const articles = getAllArticles();

  const articleUrls = articles.map((article) => ({
    changeFrequency: "monthly" as const,
    lastModified: new Date(article.date),
    priority: 0.8,
    url: `${siteConfig.url}/blog/${article.slug}`,
  }));

  return [
    {
      changeFrequency: "weekly",
      lastModified: new Date(),
      priority: 1,
      url: siteConfig.url,
    },
    ...articleUrls,
  ];
};

export default sitemap;
