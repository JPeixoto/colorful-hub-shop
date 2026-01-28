import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { SocialHeader } from '@/components/SocialHeader';
import { Hero } from '@/components/Hero';
import { BookGrid } from '@/components/BookGrid';
import { Footer } from '@/components/Footer';
import { brandInfo, books } from '@/data/books';

const Index = () => {
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get('book');
  
  const siteUrl = (
    import.meta.env.VITE_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "https://www.coloringfunbooks.store")
  ).replace(/\/+$/, "");
  const withSiteUrl = (path: string) => (siteUrl ? `${siteUrl}${path}` : path);
  
  // Find the specific book if bookId is provided
  const selectedBook = useMemo(() => 
    bookId ? books.find(book => book.id === bookId) : null,
    [bookId]
  );
  
  // Dynamic meta tags based on selected book
  const pageTitle = selectedBook 
    ? `${selectedBook.title} | ${brandInfo.name}`
    : `${brandInfo.name} | Children's Coloring Books`;
  
  const pageDescription = selectedBook
    ? selectedBook.description
    : "Sparking imagination, one page at a time. Discover delightful coloring books that inspire creativity and bring joy to children everywhere.";
  
  const canonicalUrl = siteUrl 
    ? (selectedBook ? `${siteUrl}/?book=${selectedBook.id}` : `${siteUrl}/`)
    : "/";
  
  const shareImage = selectedBook
    ? withSiteUrl(selectedBook.coverImage)
    : withSiteUrl("/hero-illustration.png");
  const shareImageAlt = selectedBook
    ? `${selectedBook.title} cover`
    : "Coloring Fun Books - Children's Coloring Books";

  useEffect(() => {
    document.dispatchEvent(new Event("prerender-ready"));
    
    // Scroll to the specific book if bookId is provided
    if (bookId && selectedBook) {
      const timer = setTimeout(() => {
        const element = document.getElementById(`book-${bookId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add a highlight effect
          element.classList.add('ring-4', 'ring-primary', 'ring-offset-4');
          setTimeout(() => {
            element.classList.remove('ring-4', 'ring-primary', 'ring-offset-4');
          }, 2000);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [bookId, selectedBook]);

  // Handle hash navigation on page load (e.g., #collection)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait for content to render and images to start loading
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 600);
      return () => clearTimeout(timer);
    }
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
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={shareImage} />
        <meta property="og:image:secure_url" content={shareImage} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content={shareImageAlt} />
        <meta property="og:site_name" content={brandInfo.name} />
        {selectedBook ? (
          <>
            <meta property="og:image:width" content="800" />
            <meta property="og:image:height" content="1067" />
          </>
        ) : (
          <>
            <meta property="og:image:width" content="1024" />
            <meta property="og:image:height" content="1024" />
          </>
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={brandInfo.name} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={shareImage} />
        <meta name="twitter:image:alt" content={shareImageAlt} />
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
