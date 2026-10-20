import { cp, mkdir } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";
import { defineConfig, type ResolvedConfig } from "vite";
import react from "@vitejs/plugin-react";

function copyPublicAssetsWithoutSourceVideos() {
  let root = process.cwd();
  let outDir = "";

  return {
    name: "copy-public-assets-without-source-videos",
    apply: "build" as const,
    configResolved(config: ResolvedConfig) {
      root = config.root;
      outDir = resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const publicDir = resolve(root, "public");
      await mkdir(outDir, { recursive: true });
      await cp(publicDir, outDir, {
        recursive: true,
        force: false,
        errorOnExist: false,
        filter: (source) => {
          const publicPath = relative(publicDir, source);
          return publicPath === "" || publicPath.split(sep)[0] !== "videos";
        },
      });
    },
  };
}

export default defineConfig({
  base: "/reuben-portfolio/",
  plugins: [react(), copyPublicAssetsWithoutSourceVideos()],
  build: {
    copyPublicDir: false,
  },
});
