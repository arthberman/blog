export const siteConfig = {
  author: {
    name: "Arthur Berman",
    url: "https://arthberman.com",
  },
  description: "Personal website of Arthur Berman",
  links: {
    twitter: "https://twitter.com/arthberman",
  },
  name: "Arthur Berman",
  url: "https://arthberman.com",
} as const;

export type SiteConfig = typeof siteConfig;
