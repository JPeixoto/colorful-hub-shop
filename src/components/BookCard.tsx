import { useState, useEffect, useId, useRef } from 'react';
import { motion } from 'framer-motion';
import { Book } from '@/types/book';
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

interface BookCardImageProps {
  src: string;
  alt: string;
  eager?: boolean;
  className?: string;
}

function BookCardImage({ src, alt, eager = false, className }: BookCardImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={cn(
        "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
        loaded ? "opacity-100" : "opacity-0",
        className
      )}
    />
  );
}

export function BookCard({ book, index }: BookCardProps) {
  const images = book.images && book.images.length > 0 ? book.images : [book.coverImage];
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const descriptionId = useId();
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (isExpanded) {
      return;
    }

    const element = descriptionRef.current;
    if (!element) {
      return;
    }

    const checkTruncation = () => {
      const truncated = element.scrollHeight > element.clientHeight + 1;
      setIsTruncated(truncated);
    };

    checkTruncation();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(checkTruncation);
      observer.observe(element);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [book.description, isExpanded]);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
      className={cn(
        "group relative h-full bg-card rounded-2xl shadow-card overflow-hidden",
        "border-[3px] border-border/60 hover:shadow-hover transition-all duration-300",
        "border-l-4",
        accentBorders[book.accentColor]
      )}
    >
      <div className="flex h-full flex-col p-4 sm:p-5">
        {/* Cover Image / Slider */}
        <div className="relative mb-2.5 aspect-[3/4] rounded-xl overflow-hidden bg-muted">
          {images.length > 1 ? (
            <Carousel className="w-full h-full" setApi={setApi}>
              <CarouselContent className="h-full">
                {images.map((img, idx) => (
                  <CarouselItem key={img} className="h-full">
                    <div className="relative h-full w-full">
                      <BookCardImage
                        src={img}
                        alt={`${book.title} view ${idx + 1}`}
                        eager={idx === 0 && index < 4}
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
            <BookCardImage
              src={book.coverImage}
              alt={`${book.title} coloring book cover`}
              eager={index < 4}
              className="transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {book.badge && (
            <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-md z-10">
              {book.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col space-y-1 sm:space-y-1.5">
          <div className="min-h-[4rem] sm:min-h-[4.5rem]">
            <h3 className="text-lg font-bold text-foreground leading-snug line-clamp-2">
              {book.title}
            </h3>
            {book.subtitle && (
              <p className="text-sm text-muted-foreground font-semibold sm:font-medium line-clamp-1">
                {book.subtitle}
              </p>
            )}
          </div>

          <p
            id={descriptionId}
            ref={descriptionRef}
            className={cn(
              "min-h-[5.5rem] sm:min-h-[6.25rem] text-base sm:text-sm text-muted-foreground leading-relaxed",
              isExpanded ? "line-clamp-none" : "line-clamp-5"
            )}
          >
            {book.description}
          </p>
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            aria-controls={descriptionId}
            aria-hidden={!isTruncated}
            disabled={!isTruncated}
            tabIndex={isTruncated ? 0 : -1}
            className={cn(
              "self-start text-xs font-semibold text-primary transition-colors",
              isTruncated ? "hover:text-primary/90" : "invisible"
            )}
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>

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
          <div className="pt-2 mt-auto">
            <SmartBookButton
              amazonId={book.amazonId}
              className="w-full"
              variant="default"
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
