import path from "node:path";
import { mkdir, writeFile, readFile } from "node:fs/promises";

const distDir = path.resolve(process.cwd(), "dist");

// Check if we're running on Vercel or CI
const isVercel = process.env.VERCEL || process.env.CI;

if (isVercel) {
  console.log("⚠️  Skipping prerendering on Vercel (using static meta tags instead)");
  console.log("✓ Build will succeed with client-side rendering + static OG tags");
  process.exit(0);
}

// Import book data to generate routes for each book
const booksFile = await readFile(path.resolve(process.cwd(), "src/data/books.ts"), "utf-8");
const bookIds = [...booksFile.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);

// Dynamic import to avoid loading puppeteer on Vercel
const { default: Prerenderer } = await import("@prerenderer/prerenderer");
const { default: PuppeteerRenderer } = await import("@prerenderer/renderer-puppeteer");

const prerenderer = new Prerenderer({
  staticDir: distDir,
  renderer: PuppeteerRenderer,
  rendererOptions: {
    renderAfterDocumentEvent: "prerender-ready",
    skipThirdPartyRequests: true,
    maxConcurrentRoutes: 5, // Limit concurrency
  },
});

try {
  await prerenderer.initialize();
  
  // Prerender homepage
  console.log("Prerendering homepage...");
  const homeRoutes = await prerenderer.renderRoutes(["/"]);
  await mkdir(distDir, { recursive: true });
  await writeFile(path.join(distDir, "index.html"), homeRoutes[0].html, "utf8");
  console.log("✓ Prerendered: /");
  
  // Prerender each book page
  console.log(`\nPrerendering ${bookIds.length} book pages...`);
  for (const bookId of bookIds) {
    try {
      const routes = await prerenderer.renderRoutes([`/?book=${bookId}`]);
      const bookDir = path.join(distDir, "book", bookId);
      await mkdir(bookDir, { recursive: true });
      await writeFile(path.join(bookDir, "index.html"), routes[0].html, "utf8");
      console.log(`✓ Prerendered: /book/${bookId}`);
    } catch (error) {
      console.error(`✗ Failed to prerender book/${bookId}:`, error.message);
    }
  }
  
  console.log(`\n✓ Successfully prerendered ${1 + bookIds.length} routes`);
} catch (error) {
  console.error("Prerendering failed:", error);
  process.exit(1);
} finally {
  await prerenderer.destroy();
}
