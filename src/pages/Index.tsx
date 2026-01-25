import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { SocialHeader } from '@/components/SocialHeader';
import { Hero } from '@/components/Hero';
import { BookGrid } from '@/components/BookGrid';
import { Footer } from '@/components/Footer';
import { brandInfo, books } from '@/data/books';

const Index = () => {
  const siteUrl = (import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "")).replace(/\/+$/, "");
  const withSiteUrl = (path: string) => (siteUrl ? `${siteUrl}${path}` : path);
  const pageTitle = `${brandInfo.name} | Children's Coloring Books`;
  const pageDescription = "Sparking imagination, one page at a time. Discover delightful coloring books that inspire creativity and bring joy to children everywhere.";
  const canonicalUrl = siteUrl ? `${siteUrl}/` : "/";
  const shareImage = withSiteUrl("/books/amazon_extracted/b-letters-en-front.jpg");

  useEffect(() => {
    document.dispatchEvent(new Event("prerender-ready"));
  }, []);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": brandInfo.name,
        "description": brandInfo.description,
        "url": siteUrl,
        "sameAs": Object.values(brandInfo.socialLinks),
      },
      {
        "@type": "CollectionPage",
        "name": pageTitle,
        "description": pageDescription,
        "url": canonicalUrl,
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": books.map((book, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Book",
              "name": book.title,
              "description": book.description,
              "image": withSiteUrl(book.coverImage),
              "inLanguage": book.language?.length ? book.language : undefined,
              "numberOfPages": book.pageCount,
              "audience": {
                "@type": "PeopleAudience",
                "suggestedAge": book.ageRange,
              },
              "author": {
                "@type": "Organization",
                "name": brandInfo.name,
              },
            },
          })),
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={shareImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={brandInfo.name} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={shareImage} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <SocialHeader />
      <main>
        <Hero />
        <BookGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
