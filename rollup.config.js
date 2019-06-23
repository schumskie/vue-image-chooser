import vue from "rollup-plugin-vue";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/index.js",
  output: {
    name: "VueImageChooser",
    format: "cjs",
    file: "dist/index.js"
  },
  plugins: [commonjs(), vue(/* options */)]
};
