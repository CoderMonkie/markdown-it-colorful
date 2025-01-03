// rolldown.config.js
import { defineConfig } from 'rolldown';
import terser from '@rollup/plugin-terser'
import { babel } from '@rollup/plugin-babel'

const pkgName = process.env.npm_package_name;
const globalName = pkgName.split('-').join('');

export default defineConfig({
  input: 'index.mjs',
  output: [
    {
      file: `dist/${pkgName}.js`,
      format: 'umd',
      name: globalName,
      plugins: [
        // Here terser is used only to force ascii output
        terser({
          mangle: false,
          compress: false,
          format: { comments: 'all', beautify: true, ascii_only: true, indent_level: 2 }
        })
      ]
    },
    {
      file: `dist/${pkgName}.min.js`,
      format: 'umd',
      name: globalName,
      plugins: [
        terser({
          format: { ascii_only: true }
        })
      ]
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
  ],
  plugins: [
    babel({ babelHelpers: 'bundled' }),
  ],
});