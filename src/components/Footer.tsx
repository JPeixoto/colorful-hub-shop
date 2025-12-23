import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { brandInfo } from '@/data/books';

export function Footer() {
  return (
    <footer className="py-8 border-t border-border bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for little dreamers
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {brandInfo.name}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
