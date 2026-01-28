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

// Decorative SVG shapes for premium aesthetic
const DecorativeCircle = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
  </svg>
);

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.92, x: 20 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-[image:var(--gradient-hero)]">
      {/* Animated decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Blurred gradient orbs */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-80 h-80 bg-peach rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-20 -right-40 w-96 h-96 bg-lavender rounded-full blur-3xl opacity-25"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-20 left-1/4 w-80 h-80 bg-mint rounded-full blur-3xl opacity-20"
        />

        {/* Decorative circle accent - top right */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-16 -right-16 text-primary opacity-10"
        >
          <DecorativeCircle className="w-48 h-48" />
        </motion.div>
      </div>

      <div className="container relative z-10">
        {/* Asymmetric grid layout */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center"
        >
          {/* Text Content - Left side (takes up less space) */}
          <motion.div className="text-left max-w-xl" variants={itemVariants}>
            {/* Tagline with icon */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/50 dark:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm border border-white/20 hover:bg-white/60 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-primary tracking-wider uppercase">
                {brandInfo.tagline}
              </span>
            </motion.div>

            {/* Main Headline - Playfair Display with gradient */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-black mb-6 leading-[1.15] tracking-tight text-gradient-primary"
            >
              Spark Creativity
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6 leading-[1.2] text-foreground"
            >
              with Coloring Fun Books
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg font-body"
            >
              {brandInfo.description}
            </motion.p>

            {/* Amazon stores info */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 text-sm sm:text-base font-medium text-muted-foreground">
                <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 flex-shrink-0" />
                <span>Available on 14 Amazon stores worldwide</span>
              </div>

              {/* Flag grid - show first 7 flags */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-2"
              >
                {AMAZON_STORE_CODES.slice(0, 7).map((code, idx) => {
                  const country = COUNTRIES[code];
                  return (
                    <motion.img
                      key={code}
                      src={country.flagUrl}
                      alt={`${country.name} flag`}
                      title={country.name}
                      className="h-6 w-8 rounded shadow-sm object-cover hover:scale-110 transition-transform duration-200 cursor-pointer"
                      whileHover={{ scale: 1.15 }}
                    />
                  );
                })}
                <div className="flex items-center px-2 py-1 text-xs font-semibold text-muted-foreground bg-white/30 rounded">
                  +7 more
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero Image - Right side (larger, asymmetric offset) */}
          <motion.div
            variants={imageVariants}
            className="relative lg:h-[600px] flex items-center justify-end"
          >
            {/* Decorative background shape */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-8 bg-gradient-to-tr from-primary/15 to-purple-500/10 rounded-[3rem] blur-2xl -z-10"
            />

            {/* Main hero image with premium frame */}
            <div className="relative z-10 w-full max-w-sm lg:max-w-md">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border-0">
                <motion.img
                  src="/hero-illustration.png"
                  alt="Magical coloring book scene"
                  className="w-full h-auto object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none rounded-3xl" />
              </div>

              {/* Floating accent circle */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: 360 }}
                transition={{ y: { duration: 3, repeat: Infinity }, rotate: { duration: 20, repeat: Infinity, ease: 'linear' } }}
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-peach to-sunshine rounded-full blur-2xl opacity-40 pointer-events-none"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
