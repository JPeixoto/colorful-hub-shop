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

const accentGradients = {
  peach: 'from-[hsl(25_90%_85%)] to-[hsl(16_85%_75%)]',
  mint: 'from-[hsl(165_50%_85%)] to-[hsl(165_60%_70%)]',
  lavender: 'from-[hsl(280_50%_90%)] to-[hsl(280_60%_80%)]',
  sky: 'from-[hsl(200_70%_88%)] to-[hsl(200_80%_75%)]',
  sunshine: 'from-[hsl(45_95%_75%)] to-[hsl(35_90%_65%)]',
  blush: 'from-[hsl(350_60%_88%)] to-[hsl(350_70%_78%)]',
};

export function BookCard({ book, index }: BookCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-[image:var(--gradient-card)] rounded-3xl shadow-card overflow-hidden border border-border/50 hover:shadow-hover transition-shadow duration-300"
    >
      {/* Accent color gradient strip */}
      <div className={cn('h-2 bg-gradient-to-r', accentGradients[book.accentColor])} />
      
      <div className="p-5 sm:p-6">
        {/* Cover Image */}
        <div className="relative mb-5 aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-soft">
          <img
            src={book.coverImage}
            alt={`${book.title} coloring book cover`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {book.badge && (
            <motion.span 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="absolute top-3 right-3 bg-gradient-to-r from-primary to-[hsl(30_90%_55%)] text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
            >
              {book.badge}
            </motion.span>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-extrabold text-foreground leading-tight">
              {book.title}
            </h3>
            {book.subtitle && (
              <p className="text-sm text-muted-foreground font-semibold mt-0.5">
                {book.subtitle}
              </p>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {book.description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground bg-secondary px-3 py-1.5 rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              {book.pageCount} pages
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground bg-accent px-3 py-1.5 rounded-full">
              <Star className="w-3.5 h-3.5" />
              Ages {book.ageRange}
            </span>
          </div>

          {/* Features */}
          <ul className="flex flex-wrap gap-2">
            {book.features.map((feature) => (
              <li
                key={feature}
                className={cn(
                  'text-xs font-semibold px-2.5 py-1 rounded-lg',
                  accentColorClasses[book.accentColor],
                  'text-foreground/90'
                )}
              >
                {feature}
              </li>
            ))}
          </ul>

          {/* Marketplace Links */}
          <div className="pt-3 space-y-3">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Available at
            </p>
            <div className="flex flex-wrap gap-2">
              {book.marketplaceLinks.map((link) => (
                <Button
                  key={link.marketplace}
                  variant="default"
                  size="sm"
                  asChild
                  className="bg-gradient-to-r from-primary to-[hsl(30_90%_55%)] hover:from-[hsl(16_90%_50%)] hover:to-[hsl(30_95%_50%)] shadow-md hover:shadow-lg transition-all duration-300"
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
      </div>
    </motion.article>
  );
}
