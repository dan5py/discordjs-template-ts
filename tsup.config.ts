import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["./src/**/*.ts"],
  format: "cjs",
  clean: true,
  minify: true,
  outDir: "dist",
  bundle: false,
  esbuildOptions(options, ctx) {
    options.outbase = "./src"
  },
  dts: false,
  sourcemap: false,
})
