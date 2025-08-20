import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'

// 读取 Vue3 源码 package.json 里的 version
const vuePkg = JSON.parse(
  fs.readFileSync(new URL('../core/packages/vue/package.json', import.meta.url))
)

// https://vite.dev/config/
export default defineConfig({
  server:{
    port: 5170,
  },
  build:{
    sourcemap: true
  },
  plugins: [
    vue()
  ],
  resolve:{
    extensions: ['.vue', '.ts', '.js', '.json', '.mjs'],
    alias: {
    '@': path.resolve(__dirname, 'src'),

    // 核心运行时
    'vue': fileURLToPath(new URL('../core/packages/vue/src/index.ts', import.meta.url)),
    '@vue/runtime-dom': fileURLToPath(new URL('../core/packages/runtime-dom/src/index.ts', import.meta.url)),
    '@vue/runtime-core': fileURLToPath(new URL('../core/packages/runtime-core/src/index.ts', import.meta.url)),
    '@vue/reactivity': fileURLToPath(new URL('../core/packages/reactivity/src/index.ts', import.meta.url)),
    '@vue/shared': fileURLToPath(new URL('../core/packages/shared/src/index.ts', import.meta.url)),

    // 编译器相关
    '@vue/compiler-dom': fileURLToPath(new URL('../core/packages/compiler-dom/src/index.ts', import.meta.url)),
    '@vue/compiler-core': fileURLToPath(new URL('../core/packages/compiler-core/src/index.ts', import.meta.url)),
    '@vue/compiler-ssr': fileURLToPath(new URL('../core/packages/compiler-ssr/src/index.ts', import.meta.url)),
    '@vue/reactivity-transform': fileURLToPath(new URL('../core/packages/reactivity-transform/src/index.ts', import.meta.url))
  }
  },
  optimizeDeps: {
   exclude: [
    'vue',
    '@vue/runtime-dom',
    '@vue/runtime-core',
    '@vue/reactivity',
    '@vue/shared',
    '@vue/compiler-dom',
    '@vue/compiler-core',
    '@vue/compiler-ssr',
    '@vue/reactivity-transform'] // 确保不被预打包
  },
  define: {
    __DEV__: process.env.NODE_ENV !== 'production',
    __TEST__: false, // 是否为测试环境
    __BROWSER__: true, // 是否为浏览器环境
    __GLOBAL__: false, // 是否为全局打包
    __ESM_BUNDLER__: true, // 是否为 ESM 打包器
    __SSR__: false, // 是否启用 SSR
    __COMPAT__: false, // 是否启用兼容模式
    __FEATURE_SUSPENSE__: true, // 是否启用 Suspense
    __FEATURE_OPTIONS_API__: true,  // 是否启用 Options API
    __FEATURE_PROD_DEVTOOLS__: false,  // 是否启用生产环境的 devtools
    __VERSION__: JSON.stringify(vuePkg.version), // Vue3 源码的版本号
    // 新增的 feature flags（避免 featureFlags.ts 报错）
    __VUE_OPTIONS_API__: true,  //是否启用 Options API（data、methods 等）
    __VUE_PROD_DEVTOOLS__: false, //生产环境是否启用 devtools
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, //SSR hydration 失败时是否输出详细差异（生产默认关）
  },
  proxy:{
    '/api': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '/api'),
    },
  }
})
