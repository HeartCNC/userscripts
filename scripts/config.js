const path = require('path')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const alias = require('rollup-plugin-alias')
const replace = require('rollup-plugin-replace')
const buble = require('rollup-plugin-buble')
import {
  terser
} from 'rollup-plugin-terser'
import {
  camelize
} from './common'
const resolve = p => path.resolve(__dirname, '../', p)
const pkgJson = require('../package.json')
const version = process.env.VERSION || pkgJson.version
/**
 * userscript target
 */
const target = 'video-helper'

const aliases = {
  '@': resolve('src'),
}
const placeholder = {
  __VERSION__: version
}
const manifestJSON = require(resolve(`src/${target}/manifest.json`))
const createBanner = (manifest) => {
  let s = ''
  for(let k in manifest) {
    let v = manifest[k]
    if (!Array.isArray(v)) {
      v = [v]
    }
    v.forEach(item => {
      s += (
        '// @' + k + (' '.repeat(13 - k.length)) +
        item
      ) +
      '\n'
    })
  }
  return s
}
const banner =
  `// ==UserScript==\n` +
  createBanner(manifestJSON) +
  '// ==/UserScript==\n'

const envs = {
  development: {
    input: resolve(`src/${target}/index.js`),
    dest: resolve(`dist/${target}.js`),
    env: 'development',
    banner,
    moduleName: camelize(target)
  },
  production: {
    input: resolve(`src/${target}/index.js`),
    dest: resolve(`dist/${target}.min.js`),
    env: 'production',
    banner,
    moduleName: camelize(target),
    plugins: [
      terser()
    ]
  }
}

const genConfig = (env) => {
  if (!(env in envs)) {
    throw new Error(env + ': enviroment is error')
  }
  const opt = envs[env]
  const config = {
    input: opt.input,
    output: {
      format: 'iife',
      file: opt.dest,
      banner: opt.banner
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      alias(aliases),
      replace(placeholder),
      buble()
    ].concat(opt.plugins || []),
  }

  return [config]
}

module.exports = genConfig(process.env.MODE)