import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { books } from '@/data/books';
import { BookCard } from '@/components/BookCard';
import { Palette, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BookGrid() {
  const [filter, setFilter] = useState<'All' | 'English' | 'Portuguese'>('All');

  const filteredBooks = books.filter(book => {
    if (filter === 'All') return true;
    if (filter === 'English') return book.language?.includes('en');
    if (filter === 'Portuguese') return book.language?.includes('pt');
    return true;
  });

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[image:var(--gradient-section)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 text-primary mb-3">
              <Palette className="w-5 h-5" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">Our Collection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground">
              Coloring Books
            </h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} available
            </p>
          </motion.div>

          {/* Filter Controls - Refined */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="inline-flex p-1.5 bg-white/50 backdrop-blur-md rounded-full border border-white/20 shadow-card hover:shadow-elevated transition-all duration-300">
              {['All', 'English', 'Portuguese'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 relative",
                    filter === f
                      ? "text-primary z-10 font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/30"
                  )}
                >
                  {filter === f && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  {f}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Grid with staggered animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-7">
          <AnimatePresence mode="sync">
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <BookCard book={book} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredBooks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Palette className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-40" />
            <p className="text-lg text-muted-foreground font-medium">
              No books found for this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
