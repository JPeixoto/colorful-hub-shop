import { motion } from 'framer-motion';
import { books } from '@/data/books';
import { BookCard } from '@/components/BookCard';
import { Palette } from 'lucide-react';

export function BookGrid() {
  return (
    <section className="py-10 sm:py-14 bg-[image:var(--gradient-section)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 text-primary mb-2">
            <Palette className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wide">Our Collection</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Coloring Books
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {books.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
