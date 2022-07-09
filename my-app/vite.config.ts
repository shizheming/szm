import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 字符串简写写法
      // "/foo": "http://localhost:4567",
      // 选项写法
      "^/api/": {
        target: "http://st1-manage.mingqijia.com/",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // 正则表达式写法
      /* "^/fallback/.*": {
        target: "'http://st1-manage.mingqijia.com/'",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ""),
      },
      // 使用 proxy 实例
      "/api": {
        target: "'http://st1-manage.mingqijia.com/'",
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        },
      }, */
    },
  },
})
