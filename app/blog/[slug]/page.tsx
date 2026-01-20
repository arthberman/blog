import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllArticles, getArticleBySlug } from "@/lib/blog-data";
import { siteConfig } from "@/lib/site-config";

type Params = Promise<{ slug: string }>;

export const generateStaticParams = () =>
  getAllArticles().map((article) => ({
    slug: article.slug,
  }));

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  const url = `${siteConfig.url}/blog/${article.slug}`;

  return {
    alternates: {
      canonical: url,
    },
    description: article.excerpt,
    openGraph: {
      authors: [siteConfig.author.name],
      description: article.excerpt,
      locale: "en_US",
      publishedTime: article.date,
      siteName: siteConfig.name,
      title: article.title,
      type: "article",
      url,
    },
    title: article.title,
    twitter: {
      card: "summary_large_image",
      creator: "@arthberman",
      description: article.excerpt,
      title: article.title,
    },
  };
};

const ArticlePage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    datePublished: article.date,
    description: article.excerpt,
    headline: article.title,
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    url: `${siteConfig.url}/blog/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
            Back
          </Link>

          <article>
            <header className="mb-8">
              <h1 className="font-[family-name:var(--font-sans)] text-3xl font-bold text-zinc-900">
                {article.title}
              </h1>
              <time className="mt-2 block text-sm text-zinc-500">
                {article.date}
              </time>
            </header>

            <div className="space-y-4 text-zinc-700 leading-relaxed [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:font-[family-name:var(--font-sans)] [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-900 [&_strong]:font-semibold [&_strong]:text-zinc-900 [&_code]:rounded [&_code]:bg-zinc-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-[family-name:var(--font-geist-mono)] [&_code]:text-sm [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-zinc-100 [&_pre]:p-4 [&_pre]:font-[family-name:var(--font-geist-mono)] [&_pre]:text-sm [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1">
              {article.content}
            </div>
          </article>
        </div>
      </main>
    </>
  );
};

export default ArticlePage;
