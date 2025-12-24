import { motion } from 'framer-motion';
import { books } from '@/data/books';
import { BookCard } from '@/components/BookCard';

export function BookGrid() {
  return (
    <section className="py-12 sm:py-16 bg-[image:var(--gradient-section)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            Our Coloring Books
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Beautifully illustrated adventures for little artists
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
