import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// import { nodePolyfills } from 'vite-plugin-node-polyfills'
// import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait(),
    solidPlugin(),
    // nodePolyfills()
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      plugins: [
        rollupNodePolyFill(),
        // inject({ Buffer: ['buffer/', 'Buffer'] }),
      ] as any[],
      output: {
        manualChunks: {
          '@ckb-lumos/base': ['@ckb-lumos/base'],
          '@ckb-lumos/codec': ['@ckb-lumos/codec'],
          '@ckb-lumos/helpers': ['@ckb-lumos/helpers'],
          'bitcore-lib': ['bitcore-lib'],
        },
      },
    },
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
      // target: ['chrome60', 'firefox60', 'safari11', 'edge18'],
    },
  },
})
