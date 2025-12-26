import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

export default defineConfig({
  entry: ["src/index.ts", "src/server.ts"],
  format: ["cjs", "esm"],
  dts: true,
  outDir: "lib",
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "next"],
  treeshake: true,
  onSuccess: () => {
    // Copy CSS file to lib directory
    const srcCss = join(process.cwd(), "src", "styles", "index.css");
    const destDir = join(process.cwd(), "lib", "styles");
    const destCss = join(destDir, "index.css");
    if (existsSync(srcCss)) {
      mkdirSync(destDir, { recursive: true });
      copyFileSync(srcCss, destCss);
    }
  },
});

