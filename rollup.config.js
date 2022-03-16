import path from 'path'
import fs from 'fs'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import buble from 'rollup-plugin-buble'
import { terser } from 'rollup-plugin-terser'

const resolve = p => path.resolve(__dirname, './', p)
const { mode, scope } = require('minimist')(process.argv.slice(2))
const isProd = mode === 'production'
const resolveScope = (scope, p) => path.resolve(__dirname, `./packages/${scope}`, p)
const scopes = fs.readdirSync(resolve('./packages'))
const createBanner = (manifest) => {
  let s = ''
  for (const k in manifest) {
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
  return '// ==UserScript==\n' +
  s +
  '// ==/UserScript==\n'

}

const plugins = {
  development: [],
  production: [
    terser({
      output: {
        comments: function (node, comment) {
          if (comment.type === 'comment1') {
            return /@\w+|==\/?UserScript==/i.test(comment.value)
          }
        }
      }
    })
  ]
}

const genConfig = (scope) => {
  if (!scopes.includes(scope)) {
    throw new Error(`[${scope}] not found in ${scopes.toString()}`)
  }

  const config = {
    env: mode,
    input: resolveScope(scope, 'index.js'),
    output: {
      format: 'iife',
      file: isProd ? resolve(`dist/${scope}.min.js`) : resolve(`example/app.js`),
      banner: createBanner(
        require(resolveScope(scope, 'manifest.json'))
      )
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      buble()
    ].concat(plugins[mode])
  }

  return config
}

const createConfig = () => {
  if (!isProd) {
    return genConfig(scope)
  }
  return scopes.map(item => genConfig(item))
}

export default createConfig()
