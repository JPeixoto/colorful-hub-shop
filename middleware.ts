import { NextRequest, NextResponse } from 'next/server';

// Book metadata mapping - keep this in sync with src/data/books.ts
const bookMetadata: Record<string, { title: string; description: string; coverImage: string }> = {
  'carnival-en': {
    title: 'Carnival around the world!',
    description: 'Luna and her friends help children explore exciting carnivals around the world through fun coloring and joyful adventures.',
    coverImage: '/books/amazon_extracted/b-carnaval-en-front.jpg'
  },
  'food-en': {
    title: 'Food and drinks with Luna and Lucas',
    description: 'Luna, the curious puppy, helps children learn about food and drinks in a fun way by coloring and exploring everyday meals.',
    coverImage: '/books/amazon_extracted/b-food-en-front.jpg'
  },
  'halloween-en': {
    title: "Halloween - The cute coloring book for kids",
    description: 'Luna, the lovely puppy, helps children enjoy a joyful Halloween with friends through fun coloring and imaginative adventures.',
    coverImage: '/books/amazon_extracted/b-halloween-en-front.jpg'
  },
  'letters-en': {
    title: 'ABC with Luna',
    description: 'Luna, the curious puppy, helps children learn the alphabet in a fun way by coloring letters and matching each one with simple, familiar words.',
    coverImage: '/books/amazon_extracted/b-letters-en-front.jpg'
  },
  'numbers-en': {
    title: 'Numbers from 1 to 50 with Luna and Gus',
    description: 'Luna, the curious puppy, and Gus, the playful duck, help children learn numbers from 1 to 50 by counting and coloring groups of objects on each page.',
    coverImage: '/books/amazon_extracted/b-numbers-en-front.jpg'
  },
  'lisbon-en': {
    title: 'Trip to Lisbon with Luna and Honey',
    description: 'Luna, the curious puppy, and Honey, the sweet bunny, travel to Lisbon to explore the city\'s main landmarks and enjoy colorful, joyful adventures.',
    coverImage: '/books/amazon_extracted/b-lisbon-en-front.jpg'
  },
  'easter-en': {
    title: 'Luna\'s Discoveries: Easter - The cute coloring book for kids',
    description: 'Luna, the lovely puppy, helps children enjoy a joyful Easter with friends through fun coloring and imaginative adventures.',
    coverImage: '/books/amazon_extracted/b-easter-en-front.jpg'
  },
  'madrid-en': {
    title: 'Trip to Madrid with Luna and Molly',
    description: 'Luna, the curious puppy, and Molly, the adventurous fox, travel to Madrid to explore the city\'s main landmarks and enjoy fun games and activities at the end of the book.',
    coverImage: '/books/amazon_extracted/b-madrid-en-front.jpg'
  },
  'london-en': {
    title: 'Trip to London with Luna and Bob',
    description: 'Luna, the curious puppy, and Bob, the playful cat, travel to London to discover the city\'s main landmarks and share new adventures together.',
    coverImage: '/books/amazon_extracted/b-london-en-front.jpg'
  },
  'paris-en': {
    title: 'Trip to Paris with Luna',
    description: 'Luna, the curious puppy, takes her first solo trip to Paris, discovering the city\'s main landmarks, enjoying new adventures and having fun with games and activities at the end of the book.',
    coverImage: '/books/amazon_extracted/b-paris-en-front.jpg'
  },
  'rome-en': {
    title: 'Trip to Rome with Luna and Bob',
    description: 'Luna, the curious puppy, and Bob, the playful cat, travel to Rome to discover the city\'s main landmarks and share new adventures together.',
    coverImage: '/books/amazon_extracted/b-rome-en-front.jpg'
  },
  'food-pt': {
    title: 'Comida & Bebida - O livro criativo de colorir para crianças',
    description: 'A Luna, uma cadelinha curiosa, ajuda as crianças a aprender sobre comida e bebidas de forma divertida, colorindo e explorando refeições do dia a dia.',
    coverImage: '/books/amazon_extracted/b-food-pt-front.jpg'
  },
  'carnaval-pt': {
    title: 'Carnaval com a Luna e os Amigos',
    description: 'A Luna, a cadelinha divertida, e os seus 3 amigos viajam por vários carnavais do mundo, divertindo-se com disfarces criativos e personagens cheias de imaginação.',
    coverImage: '/books/amazon_extracted/b-carnaval-pt-front.jpg'
  },
  'letters-pt': {
    title: 'ABC com a Luna',
    description: 'A Luna, a cadelinha curiosa, ajuda as crianças a aprenderem o alfabeto de forma divertida, pintando letras e associando cada uma a palavras simples e familiares.',
    coverImage: '/books/amazon_extracted/b-letters-pt-front.jpg'
  },
  'numbers-pt': {
    title: 'Números de 1 a 50 com a Luna e o Gus',
    description: 'A Luna, a cadelinha curiosa, e o Gus, o patinho divertido, ajudam as crianças a aprender os números de 1 a 50, contando e colorindo conjuntos de objetos em cada página.',
    coverImage: '/books/amazon_extracted/b-numbers-pt-front.jpg'
  },
  'lisbon-pt': {
    title: 'Viagem a Lisboa com a Luna e a Honey',
    description: 'A Luna, a cadelinha curiosa, e a Honey, a coelhinha doce, viajam até Lisboa para descobrir os principais pontos da cidade e viver aventuras cheias de cor e alegria.',
    coverImage: '/books/amazon_extracted/b-lisbon-pt-front.jpg'
  },
  'easter-pt': {
    title: 'Descobre a Páscoa com a Luna.',
    description: 'A Luna e os seus amigos convidam as crianças a celebrar a Páscoa com diversão, amizade e páginas de colorir cheias de imaginação.',
    coverImage: '/books/amazon_extracted/b-easter-pt-front.jpg'
  },
  'madrid-pt': {
    title: 'Viagem a Madrid com a Luna e a Molly',
    description: 'A Luna, a cadelinha curiosa, e a Molly, a raposa aventureira, viajam até Madrid para descobrir os principais pontos da cidade e divertir-se com jogos e atividades no final do livro.',
    coverImage: '/books/amazon_extracted/b-madrid-pt-front.jpg'
  },
  'halloween-pt': {
    title: 'Halloween - O livro fofinho de colorir para crianças',
    description: 'A Luna e os seus amigos convidam as crianças a celebrar o Halloween com diversão, amizade e páginas de colorir cheias de imaginação.',
    coverImage: '/books/amazon_extracted/b-halloween-pt-front.jpg'
  },
  'london-pt': {
    title: 'Viagem a Londres com a Luna e o Bob',
    description: 'A Luna, a cadelinha curiosa, e o Bob, o gato divertido, viajam até Londres para descobrir os principais pontos da cidade e viver novas aventuras juntos.',
    coverImage: '/books/amazon_extracted/b-london-pt-front.jpg'
  },
  'paris-pt': {
    title: 'Viagem a Paris com a Luna',
    description: 'A Luna, a cadelinha curiosa, faz a sua primeira viagem a solo até Paris, onde descobre os principais pontos da cidade, vive novas aventuras e diverte-se com jogos no final do livro.',
    coverImage: '/books/amazon_extracted/b-paris-pt-front.jpg'
  },
  'rome-pt': {
    title: 'Viagem a Roma com a Luna e o Bob',
    description: 'A Luna, a cadelinha curiosa, e o Bob, o gato divertido, viajam até Roma para descobrir os principais pontos da cidade e viver novas aventuras juntos.',
    coverImage: '/books/amazon_extracted/b-rome-pt-front.jpg'
  },
};

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const bookId = searchParams.get('book');

  // Only process if there's a book parameter
  if (!bookId || !bookMetadata[bookId]) {
    return NextResponse.next();
  }

  const book = bookMetadata[bookId];
  const url = request.nextUrl.clone();
  const siteUrl = url.origin;
  const fullUrl = `${siteUrl}/?book=${bookId}`;
  const imageUrl = `${siteUrl}${book.coverImage}`;

  // Fetch the index.html and inject meta tags
  return fetch(new URL('/index.html', url))
    .then(res => res.text())
    .then(html => {
      // Replace meta tags with book-specific data
      const updatedHtml = html
        .replace(
          /<meta property="og:title" content="[^"]*"/,
          `<meta property="og:title" content="${book.title} | Coloring Fun Books"`
        )
        .replace(
          /<meta property="og:description" content="[^"]*"/,
          `<meta property="og:description" content="${book.description}"`
        )
        .replace(
          /<meta property="og:url" content="[^"]*"/,
          `<meta property="og:url" content="${fullUrl}"`
        )
        .replace(
          /<meta property="og:image" content="[^"]*"/,
          `<meta property="og:image" content="${imageUrl}"`
        )
        .replace(
          /<meta property="og:image:secure_url" content="[^"]*"/,
          `<meta property="og:image:secure_url" content="${imageUrl}"`
        )
        .replace(
          /<meta property="og:image:alt" content="[^"]*"/,
          `<meta property="og:image:alt" content="${book.title} cover"`
        )
        .replace(
          /<meta name="twitter:image" content="[^"]*"/,
          `<meta name="twitter:image" content="${imageUrl}"`
        )
        .replace(
          /<meta name="twitter:description" content="[^"]*"/,
          `<meta name="twitter:description" content="${book.description}"`
        )
        .replace(
          /<title>[^<]*<\/title>/,
          `<title>${book.title} | Coloring Fun Books</title>`
        )
        .replace(
          /<meta name="description" content="[^"]*"/,
          `<meta name="description" content="${book.description}"`
        );

      return new NextResponse(updatedHtml, {
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'public, max-age=3600, s-maxage=3600',
        },
      });
    })
    .catch(() => NextResponse.next());
}

export const config = {
  matcher: '/',
};
