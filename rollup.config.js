import vue from "rollup-plugin-vue";
import commonjs from "rollup-plugin-commonjs";

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: 'dist/library.esm.js'
    },
    plugins: [
      commonjs(),
      vue()
    ]
  },
  // SSR build.
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'dist/library.ssr.js'
    },
    plugins: [
      commonjs(),
      vue({ template: { optimizeSSR: true } })
    ]
  },
  // Browser build.
  {
    input: 'src/index.js',
    output: {
      name: 'VueImageChooser',
      format: 'iife',
      file: 'dist/library.js'
    },
    plugins: [
      commonjs(),
      vue()
    ]
  }
]