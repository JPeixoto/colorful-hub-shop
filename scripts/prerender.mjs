import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import Prerenderer from "@prerenderer/prerenderer";
import PuppeteerRenderer from "@prerenderer/renderer-puppeteer";

const distDir = path.resolve(process.cwd(), "dist");

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
  const renderedRoutes = await prerenderer.renderRoutes(["/"]);
  await Promise.all(
    renderedRoutes.map(async (rendered) => {
      const outputPath = rendered.outputPath || toOutputPath(rendered.route || rendered.originalRoute);
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, rendered.html, "utf8");
    })
  );
} finally {
  await prerenderer.destroy();
}
