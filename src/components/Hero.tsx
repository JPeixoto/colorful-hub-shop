import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { brandInfo } from '@/data/books';

export function Hero() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-12 bg-[image:var(--gradient-hero)]">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 -left-10 w-40 h-40 bg-peach rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-0 right-[10%] w-52 h-52 bg-lavender rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-10 left-1/3 w-48 h-48 bg-mint rounded-full blur-3xl" 
        />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto"
        >
          {/* Tagline with sparkles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/60 dark:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-soft"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">
              {brandInfo.tagline}
            </span>
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight"
          >
            {brandInfo.description}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-muted-foreground text-base sm:text-lg"
          >
            Explore our collection of beautifully illustrated coloring books
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
