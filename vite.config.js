/**
 * 参考链接: https://vitejs.dev/config/
 */
import { defineConfig } from 'vite'
import { join } from 'path'

const root = join(__dirname, 'src')

export default defineConfig({
  resolve: {
    alias: {
      '@': root
    }
  },
  build: {
    assetsDir: 'static',
    target: ['es2015']
  }
})
