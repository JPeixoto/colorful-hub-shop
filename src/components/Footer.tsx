import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { brandInfo } from '@/data/books';

export function Footer() {
  return (
    <footer className="py-8 sm:py-10 border-t border-border/30 bg-gradient-to-t from-primary/5 to-transparent">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
        >
          <motion.p
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 font-medium hover:text-foreground transition-colors duration-200"
          >
            Made with{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block"
            >
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </motion.span>{' '}
            for little dreamers
          </motion.p>
          <motion.p
            className="text-xs font-semibold text-muted-foreground"
            whileHover={{ scale: 1.05 }}
          >
            © {new Date().getFullYear()} {brandInfo.name} • Where Imagination Comes to Life
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
