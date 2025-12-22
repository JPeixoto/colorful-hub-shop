import { motion } from 'framer-motion';
import { books } from '@/data/books';
import { BookCard } from '@/components/BookCard';

export function BookGrid() {
  return (
    <section className="py-8 sm:py-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center">
            Our Coloring Books
          </h2>
          <p className="text-muted-foreground text-center mt-2">
            Tap any book to see where you can buy it
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
