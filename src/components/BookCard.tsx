import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star } from 'lucide-react';
import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import { SmartBookButton } from '@/components/SmartBookButton';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

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
  const images = book.images && book.images.length > 0 ? book.images : [book.coverImage];
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
      className={cn(
        "group relative bg-card rounded-2xl shadow-card overflow-hidden",
        "border-[3px] border-border/60 hover:shadow-hover transition-all duration-300",
        "border-l-4",
        accentBorders[book.accentColor]
      )}
    >
      <div className="p-4 sm:p-5">
        {/* Cover Image / Slider */}
        <div className="relative mb-2.5 aspect-[3/4] rounded-xl overflow-hidden bg-muted">
          {images.length > 1 ? (
            <Carousel className="w-full h-full" setApi={setApi}>
              <CarouselContent>
                {images.map((img, idx) => (
                  <CarouselItem key={idx}>
                    <div className="aspect-[3/4] relative">
                      <img
                        src={img}
                        alt={`${book.title} view ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500"
                        loading={index < 4 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Dot Indicators */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      api?.scrollTo(idx);
                    }}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-300 shadow-sm focus:outline-none",
                      current === idx
                        ? "bg-white w-3"
                        : "bg-white/60 hover:bg-white/90"
                    )}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </Carousel>
          ) : (
            <img
              src={book.coverImage}
              alt={`${book.title} coloring book cover`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading={index < 4 ? "eager" : "lazy"}
              decoding="async"
            />
          )}

          {book.badge && (
            <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-md z-10">
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
            <SmartBookButton
              bookId={book.id}
              className="w-full"
              variant="default"
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
