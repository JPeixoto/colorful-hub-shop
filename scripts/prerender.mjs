import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import Prerenderer from "@prerenderer/prerenderer";
import PuppeteerRenderer from "@prerenderer/renderer-puppeteer";

const distDir = path.resolve(process.cwd(), "dist");

// Import book data to generate routes for each book
import { readFile } from "node:fs/promises";
const booksFile = await readFile(path.resolve(process.cwd(), "src/data/books.ts"), "utf-8");
const bookIds = [...booksFile.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);

const prerenderer = new Prerenderer({
  staticDir: distDir,
  renderer: PuppeteerRenderer,
  rendererOptions: {
    renderAfterDocumentEvent: "prerender-ready",
    skipThirdPartyRequests: true,
  },
});

const toOutputPath = (route) => {
  const normalized = route.replace(/\/+$/, "").replace(/^\/+/, "");
  if (!normalized) {
    return path.join(distDir, "index.html");
  }
  if (normalized.endsWith(".html")) {
    return path.join(distDir, normalized);
  }
  return path.join(distDir, normalized, "index.html");
};

try {
  await prerenderer.initialize();
  
  // Generate routes for homepage and each book
  const routes = [
    "/",
    ...bookIds.map(id => `/?book=${id}`)
  ];
  
  console.log(`Prerendering ${routes.length} routes...`);
  const renderedRoutes = await prerenderer.renderRoutes(routes);
  
  await Promise.all(
    renderedRoutes.map(async (rendered) => {
      const outputPath = rendered.outputPath || toOutputPath(rendered.route || rendered.originalRoute);
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, rendered.html, "utf8");
      console.log(`✓ Prerendered: ${rendered.route}`);
    })
  );
  
  console.log(`✓ Successfully prerendered ${renderedRoutes.length} routes`);
} finally {
  await prerenderer.destroy();
}
