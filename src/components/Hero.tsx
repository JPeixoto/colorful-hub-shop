import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { brandInfo } from '@/data/books';
import { COUNTRIES, type CountryCode } from '@/data/countries';

const AMAZON_STORE_CODES: CountryCode[] = [
  'US',
  'UK',
  'DE',
  'FR',
  'ES',
  'IT',
  'NL',
  'PL',
  'SE',
  'BE',
  'IE',
  'JP',
  'CA',
  'AU',
];

export function Hero() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-12 bg-[image:var(--gradient-hero)]">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-peach rounded-full blur-3xl opacity-40"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-0 right-0 w-96 h-96 bg-lavender rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-10 left-1/3 w-80 h-80 bg-mint rounded-full blur-3xl opacity-30"
        />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/60 dark:bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-4 shadow-sm border border-white/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-primary tracking-wide uppercase">
                {brandInfo.tagline}
              </span>
            </motion.div>

            {/* Main Headlines */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 leading-[1.1] tracking-tight"
            >
              Spark Creativity with <br className="hidden lg:block" />
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                Delightful Coloring Books
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed max-w-lg"
            >
              {brandInfo.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {/* Could add a primary CTA here if needed, but currently mostly informational */}
              <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-medium text-muted-foreground">
                <span className="flex h-2 w-2 rounded-full bg-green-500" />
                <span>Available on Amazon stores:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {AMAZON_STORE_CODES.map((code) => {
                    const country = COUNTRIES[code];
                    return (
                      <img
                        key={code}
                        src={country.flagUrl}
                        alt={`${country.name} flag`}
                        title={country.name}
                        className="h-5 w-7 rounded-sm shadow-sm object-cover"
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:h-auto"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500 border-4 border-white/40 max-w-[450px] mx-auto">
              <img
                src="/hero-illustration.png"
                alt="Magical coloring book scene"
                className="w-full h-[450px] object-cover"
              />
            </div>

            {/* Decor behind image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-2xl blur-xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
