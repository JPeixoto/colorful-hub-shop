import { motion } from 'framer-motion';
import { Palette, Sparkles } from 'lucide-react';
import { brandInfo } from '@/data/books';

export function Hero() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-[10%] w-20 h-20 bg-peach rounded-full blur-3xl opacity-60" />
        <div className="absolute top-32 right-[15%] w-32 h-32 bg-lavender rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-10 left-[20%] w-24 h-24 bg-mint rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-[10%] w-16 h-16 bg-sky rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Logo/Brand Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl mb-6"
          >
            <Palette className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-3"
          >
            {brandInfo.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg sm:text-xl text-primary font-semibold mb-4 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {brandInfo.tagline}
            <Sparkles className="w-5 h-5" />
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted-foreground text-base sm:text-lg leading-relaxed"
          >
            {brandInfo.description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
