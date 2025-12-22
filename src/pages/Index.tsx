import { useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { BookGrid } from '@/components/BookGrid';
import { Footer } from '@/components/Footer';
import { brandInfo, books } from '@/data/books';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = `${brandInfo.name} | Children's Coloring Books`;
    
    // Add JSON-LD structured data
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

    // Add structured data script
    const existingScript = document.querySelector('script[data-structured-data]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-structured-data', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <BookGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;