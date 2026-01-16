import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { brandInfo } from '@/data/books';

export function Footer() {
  return (
    <footer className="py-6 border-t border-border bg-card/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground"
        >
          <p className="flex items-center gap-1.5">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for little dreamers
          </p>
          <p className="text-xs">
            © {new Date().getFullYear()} {brandInfo.name}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
