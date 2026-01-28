import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { books } from '@/data/books';
import { BookCard } from '@/components/BookCard';
import { Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

// Map Portuguese categories to English for language-agnostic filtering
const categoryMap: Record<string, string> = {
  'Educational': 'Educational',
  'Educativo': 'Educational',
  'Holidays': 'Holidays',
  'Temática Festiva': 'Holidays',
  'Travel': 'Travel',
  'Viagem': 'Travel',
  'Viagens': 'Travel',
};

export function BookGrid() {
  const [languageFilter, setLanguageFilter] = useState<'All' | 'English' | 'Portuguese'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Extract unique categories from books (language-agnostic)
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    books.forEach(book => {
      book.features.forEach(feature => {
        const normalizedCategory = categoryMap[feature];
        if (normalizedCategory) {
          categorySet.add(normalizedCategory);
        }
      });
    });
    return ['All', ...Array.from(categorySet).sort()];
  }, []);

  const filteredBooks = books.filter(book => {
    // Apply language filter
    const languageMatch = 
      languageFilter === 'All' ||
      (languageFilter === 'English' && book.language?.includes('en')) ||
      (languageFilter === 'Portuguese' && book.language?.includes('pt'));

    // Apply category filter (language-agnostic)
    const categoryMatch = 
      categoryFilter === 'All' ||
      book.features.some(feature => categoryMap[feature] === categoryFilter);

    return languageMatch && categoryMatch;
  });

  return (
    <section id="collection" className="scroll-mt-24 py-8 sm:py-12 bg-[image:var(--gradient-section)]">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 text-primary mb-3">
            <Palette className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wide">Our Collection</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
            Coloring Books
          </h2>
          <p className="text-muted-foreground text-sm">
            {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} available
          </p>
        </motion.div>

        {/* Filter Controls - Horizontal Inline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {/* Language Pills */}
          {['All', 'English', 'Portuguese'].map((f) => (
            <motion.button
              key={f}
              onClick={() => setLanguageFilter(f as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                "shadow-sm hover:shadow-md",
                languageFilter === f
                  ? "bg-gradient-to-r from-primary to-pink-500 text-white shadow-elevated"
                  : "bg-white/80 backdrop-blur-sm text-muted-foreground hover:text-foreground border border-gray-200"
              )}
            >
              {f}
            </motion.button>
          ))}
          
          {/* Separator */}
          <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-1" />
          
          {/* Category Pills */}
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setCategoryFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                "shadow-sm hover:shadow-md",
                categoryFilter === category
                  ? "bg-gradient-to-r from-mint to-lavender text-white shadow-elevated"
                  : "bg-white/80 backdrop-blur-sm text-muted-foreground hover:text-foreground border border-gray-200"
              )}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          <AnimatePresence mode="wait">
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Reset index prop to avoidance staggered animation delay interfering with filtering animations if needed, 
                    or keep it for initial load. Keeping it for now. */}
                <BookCard book={book} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredBooks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-muted-foreground"
          >
            No books found for this category.
          </motion.div>
        )}
      </div>
    </section>
  );
}
