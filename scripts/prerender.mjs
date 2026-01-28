import path from "node:path";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import Prerenderer from "@prerenderer/prerenderer";
import PuppeteerRenderer from "@prerenderer/renderer-puppeteer";

const distDir = path.resolve(process.cwd(), "dist");

// Import book data to generate routes for each book
const booksFile = await readFile(path.resolve(process.cwd(), "src/data/books.ts"), "utf-8");
const bookIds = [...booksFile.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);

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
