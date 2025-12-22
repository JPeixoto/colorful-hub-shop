import { Helmet } from 'react-helmet-async';
import { Hero } from '@/components/Hero';
import { BookGrid } from '@/components/BookGrid';
import { Footer } from '@/components/Footer';
import { brandInfo, books } from '@/data/books';

const Index = () => {
  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": brandInfo.name,
    "description": brandInfo.description,
    "url": window.location.origin,
    "sameAs": Object.values(brandInfo.socialLinks),
    "offers": books.map(book => ({
      "@type": "Product",
      "name": book.title,
      "description": book.description,
      "image": `${window.location.origin}${book.coverImage}`,
      "category": "Children's Coloring Book",
    })),
  };

  return (
    <>
      <Helmet>
        <title>{brandInfo.name} | Children's Coloring Books</title>
        <meta name="description" content={`${brandInfo.tagline}. ${brandInfo.description}`} />
        <meta name="keywords" content="children's coloring books, kids coloring, activity books, educational coloring, creative kids" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${brandInfo.name} | Children's Coloring Books`} />
        <meta property="og:description" content={brandInfo.tagline} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${window.location.origin}/books/magical-animals.jpg`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={brandInfo.name} />
        <meta name="twitter:description" content={brandInfo.tagline} />
        
        {/* Canonical */}
        <link rel="canonical" href={window.location.origin} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <main>
          <Hero />
          <BookGrid />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;