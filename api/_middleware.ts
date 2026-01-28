import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/',
};

// This runs on Vercel Edge
export default async function middleware(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const bookId = searchParams.get('book');
  
  if (!bookId) {
    return NextResponse.next();
  }

  // Import book data (this needs to be dynamic in edge runtime)
  const siteUrl = 'https://www.coloringfunbooks.store';
  
  // Fetch the original HTML
  const res = await fetch(req.url);
  const html = await res.text();
  
  // Book data mapping (simplified - could be fetched from edge config)
  const bookData: Record<string, { title: string; description: string; coverImage: string }> = {
    'lisbon-en': {
      title: 'Trip to Lisbon with Luna and Honey',
      description: 'Luna, the curious puppy, and Honey, the sweet bunny, travel to Lisbon to explore the city\'s main landmarks and enjoy colorful, joyful adventures.',
      coverImage: '/books/amazon_extracted/b-lisbon-en-front.jpg'
    },
    'food-en': {
      title: 'Food and drinks with Luna and Lucas',
      description: 'Luna, the curious puppy, helps children learn about food and drinks in a fun way by coloring and exploring everyday meals.',
      coverImage: '/books/amazon_extracted/b-food-en-front.jpg'
    },
    // Add more books as needed
  };
  
  const book = bookData[bookId];
  if (!book) {
    return NextResponse.next();
  }
  
  // Replace meta tags
  const modifiedHtml = html
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${book.title} | Coloring Fun Books"`
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${book.description}"`
    )
    .replace(
      /<meta property="og:image" content="[^"]*"/,
      `<meta property="og:image" content="${siteUrl}${book.coverImage}"`
    )
    .replace(
      /<title>[^<]*<\/title>/,
      `<title>${book.title} | Coloring Fun Books</title>`
    );
  
  return new NextResponse(modifiedHtml, {
    headers: {
      'content-type': 'text/html',
    },
  });
}
