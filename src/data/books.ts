import { Book } from '@/types/book';

export const books: Book[] = [
  {
    id: 'magical-animals',
    title: 'Magical Animals',
    subtitle: 'A Coloring Adventure',
    description: 'Explore a world of enchanting creatures! From unicorns to friendly dragons, this book sparks imagination with 50+ hand-drawn illustrations.',
    coverImage: '/books/magical-animals.jpg',
    ageRange: '4-8 years',
    pageCount: 64,
    features: ['50+ illustrations', 'Thick paper', 'Single-sided pages'],
    marketplaceLinks: [
      { marketplace: 'amazon', label: 'Amazon US', url: '#', region: 'US' },
      { marketplace: 'amazon-uk', label: 'Amazon UK', url: '#', region: 'UK' },
    ],
    badge: 'Bestseller',
    accentColor: 'lavender',
  },
  {
    id: 'ocean-friends',
    title: 'Ocean Friends',
    subtitle: 'Under the Sea Coloring',
    description: 'Dive into an underwater paradise! Meet playful dolphins, wise turtles, and colorful fish in this marine adventure coloring book.',
    coverImage: '/books/ocean-friends.jpg',
    ageRange: '3-7 years',
    pageCount: 48,
    features: ['40+ illustrations', 'Easy outlines', 'Fun facts included'],
    marketplaceLinks: [
      { marketplace: 'amazon', label: 'Amazon US', url: '#', region: 'US' },
      { marketplace: 'amazon-uk', label: 'Amazon UK', url: '#', region: 'UK' },
    ],
    accentColor: 'sky',
  },
  {
    id: 'dinosaur-world',
    title: 'Dinosaur World',
    subtitle: 'Prehistoric Coloring Fun',
    description: 'Travel back in time to when dinosaurs roamed the Earth! T-Rex, Triceratops, and more await in this exciting prehistoric adventure.',
    coverImage: '/books/dinosaur-world.jpg',
    ageRange: '5-10 years',
    pageCount: 56,
    features: ['45+ dinosaurs', 'Dino facts', 'Activity pages'],
    marketplaceLinks: [
      { marketplace: 'amazon', label: 'Amazon US', url: '#', region: 'US' },
    ],
    badge: 'New',
    accentColor: 'mint',
  },
  {
    id: 'fairy-garden',
    title: 'Fairy Garden',
    subtitle: 'Enchanted Coloring',
    description: 'Step into a magical garden filled with fairies, butterflies, and blooming flowers. Perfect for little dreamers who love all things magical.',
    coverImage: '/books/fairy-garden.jpg',
    ageRange: '4-9 years',
    pageCount: 52,
    features: ['48+ illustrations', 'Glitter cover', 'Bonus stickers'],
    marketplaceLinks: [
      { marketplace: 'amazon', label: 'Amazon US', url: '#', region: 'US' },
      { marketplace: 'etsy', label: 'Etsy', url: '#' },
    ],
    accentColor: 'blush',
  },
];

export const brandInfo = {
  name: 'Little Crayon Studio',
  tagline: 'Sparking imagination, one page at a time',
  description: 'We create delightful coloring books that inspire creativity and bring joy to children everywhere. Each book is thoughtfully designed with love.',
  socialLinks: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    pinterest: 'https://pinterest.com',
    tiktok: 'https://tiktok.com',
  },
  email: 'hello@littlecrayonstudio.com',
};
