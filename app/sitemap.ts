import { type MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    changeFrequency: "weekly",
    lastModified: new Date(),
    priority: 1,
    url: siteConfig.url,
  },
];

export default sitemap;
