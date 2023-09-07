import { build, context } from "esbuild"
import * as fs from "node:fs"

const tsconfig = JSON.parse(fs.readFileSync("tsconfig.json", "utf8"))
const alias = Object.fromEntries(Object.entries(tsconfig.compilerOptions.paths).map((i) => i.flat(1)))
const prod = process.env.NODE_ENV === "production"

/** @type {import("esbuild").BuildOptions} */
const options = {
  alias,
  loader: {
    ".txt": "text",
  },
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node18",
  logLevel: "info",
  outdir: "dist",
  entryPoints: ["src/index.ts"],
}

prod && build({ ...options, minify: true })
!prod && context(options).then((ctx) => ctx.watch())

prod && build({ ...options, outdir: "test", entryPoints: ["./src/index.test.ts"], minify: true })
!prod && context({ ...options, outdir: "test", entryPoints: ["./src/index.test.ts"] }).then((ctx) => ctx.watch())
