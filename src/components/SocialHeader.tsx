import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { brandInfo } from '@/data/books';

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
    </svg>
  );
}

const socialLinks = [
  { 
    icon: Instagram, 
    href: brandInfo.socialLinks.instagram, 
    label: 'Instagram',
    hoverBg: 'hover:bg-pink-500'
  },
  { 
    icon: Facebook, 
    href: brandInfo.socialLinks.facebook, 
    label: 'Facebook',
    hoverBg: 'hover:bg-blue-600'
  },
  { 
    icon: PinterestIcon, 
    href: brandInfo.socialLinks.pinterest, 
    label: 'Pinterest',
    hoverBg: 'hover:bg-red-600'
  },
  { 
    icon: TikTokIcon, 
    href: brandInfo.socialLinks.tiktok, 
    label: 'TikTok',
    hoverBg: 'hover:bg-zinc-800'
  },
];

export function SocialHeader() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-gradient-to-r from-primary via-primary to-[hsl(30_90%_55%)] shadow-header"
    >
      <div className="container py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <span className="text-2xl drop-shadow-md">🎨</span>
            <span className="font-extrabold text-lg text-primary-foreground drop-shadow-sm">{brandInfo.name}</span>
          </motion.div>

          {/* Social Links - Prominent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <span className="text-sm text-primary-foreground/90 font-medium hidden sm:block">Follow us:</span>
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label, hoverBg }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${label}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.08, type: 'spring', stiffness: 300 }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full
                    bg-primary-foreground/20 backdrop-blur-sm
                    border-2 border-primary-foreground/30
                    text-primary-foreground
                    transition-all duration-300
                    ${hoverBg} hover:border-transparent hover:shadow-lg
                  `}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Email */}
          <motion.a
            href={`mailto:${brandInfo.email}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors bg-primary-foreground/10 px-3 py-1.5 rounded-full backdrop-blur-sm"
          >
            <Mail className="w-4 h-4" />
            <span className="hidden md:inline font-medium">{brandInfo.email}</span>
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}
