import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Star } from 'lucide-react';
import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BookCardProps {
  book: Book;
  index: number;
}

const accentBorders = {
  peach: 'border-l-[hsl(25_90%_75%)]',
  mint: 'border-l-[hsl(165_55%_70%)]',
  lavender: 'border-l-[hsl(280_55%_80%)]',
  sky: 'border-l-[hsl(200_75%_75%)]',
  sunshine: 'border-l-[hsl(45_95%_65%)]',
  blush: 'border-l-[hsl(350_65%_78%)]',
};

const accentBadges = {
  peach: 'bg-peach text-foreground',
  mint: 'bg-mint text-foreground',
  lavender: 'bg-lavender text-foreground',
  sky: 'bg-sky text-foreground',
  sunshine: 'bg-sunshine text-foreground',
  blush: 'bg-blush text-foreground',
};

export function BookCard({ book, index }: BookCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        "group relative bg-card rounded-2xl shadow-card overflow-hidden",
        "border border-border/60 hover:shadow-hover transition-all duration-300",
        "border-l-4",
        accentBorders[book.accentColor]
      )}
    >
      <div className="p-4 sm:p-5">
        {/* Cover Image */}
        <div className="relative mb-4 aspect-[3/4] rounded-xl overflow-hidden bg-muted">
          <img
            src={book.coverImage}
            alt={`${book.title} coloring book cover`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {book.badge && (
            <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
              {book.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-bold text-foreground leading-snug">
              {book.title}
            </h3>
            {book.subtitle && (
              <p className="text-sm text-muted-foreground font-medium">
                {book.subtitle}
              </p>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {book.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {book.pageCount} pages
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="w-3.5 h-3.5" />
              Ages {book.ageRange}
            </span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5">
            {book.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className={cn(
                  'text-xs font-semibold px-2 py-0.5 rounded-md',
                  accentBadges[book.accentColor]
                )}
              >
                {feature}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-2">
            {book.marketplaceLinks.map((link) => (
              <Button
                key={link.marketplace}
                size="sm"
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-sm"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Buy ${book.title} on ${link.label}`}
                >
                  {link.label}
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
