import { motion } from 'framer-motion';
import { Palette, Sparkles } from 'lucide-react';
import { brandInfo } from '@/data/books';

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-[image:var(--gradient-hero)]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-[10%] w-32 h-32 bg-peach rounded-full blur-3xl opacity-70" 
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-20 right-[15%] w-48 h-48 bg-lavender rounded-full blur-3xl opacity-60" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-10 left-[20%] w-36 h-36 bg-mint rounded-full blur-3xl opacity-60" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-20 right-[10%] w-24 h-24 bg-sky rounded-full blur-3xl opacity-70" 
        />
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sunshine rounded-full blur-3xl opacity-40" 
        />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Logo/Brand Icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-[hsl(30_90%_55%)] rounded-3xl mb-6 shadow-hover"
          >
            <Palette className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground drop-shadow-md" />
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-4 drop-shadow-sm"
          >
            {brandInfo.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl sm:text-2xl text-primary font-bold mb-5 flex items-center justify-center gap-3"
          >
            <Sparkles className="w-6 h-6 text-sunshine" />
            <span className="bg-gradient-to-r from-primary to-[hsl(30_90%_55%)] bg-clip-text text-transparent">
              {brandInfo.tagline}
            </span>
            <Sparkles className="w-6 h-6 text-sunshine" />
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-xl mx-auto"
          >
            {brandInfo.description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
