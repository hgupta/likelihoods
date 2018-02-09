import eslint from 'rollup-plugin-eslint'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import common from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

export default {
  input: './index.js',
  output: {
    file: './dist/likelihoods.min.js',
    format: 'iife',
    sourcemap: false,
    name: 'likelihoods'
  },
  plugins: [
    eslint({ include: ['src/*.js', 'src/**/*.js'] }),
    resolve({ main: true, module: false, browser: true, jsnext: true }),
    common(),
    babel(),
    uglify({}, minify)
  ]
}
