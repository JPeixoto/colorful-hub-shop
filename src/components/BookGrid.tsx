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
    <section className="py-8 sm:py-12 bg-[image:var(--gradient-section)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="text-left">
            <div className="inline-flex items-center gap-2 text-primary mb-2">
              <Palette className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wide">Our Collection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Coloring Books
            </h2>
          </div>

          {/* Filter Controls */}
          <div>
            <div className="inline-flex p-1 bg-white/50 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
              {['All', 'English', 'Portuguese'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 relative",
                    filter === f
                      ? "text-primary hover:text-primary z-10 font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/30"
                  )}
                >
                  {filter === f && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {f}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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
