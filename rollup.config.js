import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs';

export default {
   input: 'src/index.js',
  output: {
   name: 'VueImageChooser',
    format: 'iife',
    file: 'dist/index.js'
  },
  plugins: [
    commonjs(),
    vue(/* options */)
  ]
}