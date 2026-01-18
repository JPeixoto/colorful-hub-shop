import { Helmet } from 'react-helmet-async';
import { SocialHeader } from '@/components/SocialHeader';
import { Hero } from '@/components/Hero';
import { BookGrid } from '@/components/BookGrid';
import { Footer } from '@/components/Footer';
import { brandInfo, books } from '@/data/books';

const Index = () => {
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
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{`${brandInfo.name} | Children's Coloring Books`}</title>
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