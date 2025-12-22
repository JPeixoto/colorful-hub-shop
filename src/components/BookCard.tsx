import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Star } from 'lucide-react';
import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BookCardProps {
  book: Book;
  index: number;
}

const accentColorClasses = {
  peach: 'bg-peach',
  mint: 'bg-mint',
  lavender: 'bg-lavender',
  sky: 'bg-sky',
  sunshine: 'bg-sunshine',
  blush: 'bg-blush',
};

export function BookCard({ book, index }: BookCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card rounded-2xl shadow-card overflow-hidden"
    >
      {/* Accent color strip */}
      <div className={cn('h-2', accentColorClasses[book.accentColor])} />
      
      <div className="p-4 sm:p-6">
        {/* Cover Image */}
        <div className="relative mb-4 aspect-[3/4] rounded-xl overflow-hidden bg-muted">
          <img
            src={book.coverImage}
            alt={`${book.title} coloring book cover`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {book.badge && (
            <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-soft">
              {book.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-bold text-foreground leading-tight">
              {book.title}
            </h3>
            {book.subtitle && (
              <p className="text-sm text-muted-foreground font-medium">
                {book.subtitle}
              </p>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {book.description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground bg-muted px-2.5 py-1 rounded-full">
              <BookOpen className="w-3 h-3" />
              {book.pageCount} pages
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground bg-muted px-2.5 py-1 rounded-full">
              <Star className="w-3 h-3" />
              Ages {book.ageRange}
            </span>
          </div>

          {/* Features */}
          <ul className="flex flex-wrap gap-1.5">
            {book.features.map((feature) => (
              <li
                key={feature}
                className={cn(
                  'text-xs font-medium px-2 py-0.5 rounded-md',
                  accentColorClasses[book.accentColor],
                  'text-foreground/80'
                )}
              >
                {feature}
              </li>
            ))}
          </ul>

          {/* Marketplace Links */}
          <div className="pt-2 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Available at
            </p>
            <div className="flex flex-wrap gap-2">
              {book.marketplaceLinks.map((link) => (
                <Button
                  key={link.marketplace}
                  variant="marketplace"
                  size="sm"
                  asChild
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buy ${book.title} on ${link.label}`}
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
