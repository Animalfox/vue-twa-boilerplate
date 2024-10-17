/// <reference types="vitest" />

import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true, // enable jest-like global test APIs
    environment: 'happy-dom', // simulate DOM with happy-dom
    css: {
      modules: {
        classNameStrategy: 'non-scoped'
      }
    },
    exclude: [...configDefaults.exclude] // exclude certain directories
  },
  plugins: [
    vue(),
    VueDevTools(),
    // Docs: https://github.com/antfu/unplugin-auto-import#unplugin-auto-import
    AutoImport({
      imports: ['vue'],
      dirs: ['./src/@clean/presentation/', './src/@clean/presentation/**'],
      vueTemplate: true,
      ignore: ['useCookies', 'useStorage']
    })
  ],
  define: {
    'process.env': {}
  },
  resolve: {
    // Sort this aliases by using autocomplete priority!
    // From presentation to domain flow & root folder at last
    // Don't add your libs folders in this flow!
    alias: {
      // @clean/web/ploc
      '@ploc': fileURLToPath(new URL('./src/@clean/web/ploc', import.meta.url)),
      // @clean/web
      '@web': fileURLToPath(new URL('./src/@clean/web', import.meta.url)),
      // @clean/data/persistence
      '@persistence': fileURLToPath(
        new URL('./src/@clean/data/persistence', import.meta.url)
      ),
      // @clean/data/infrastructure
      '@infrastructure': fileURLToPath(
        new URL('./src/@clean/data/infrastructure', import.meta.url)
      ),
      // @clean/data
      '@data': fileURLToPath(new URL('./src/@clean/data', import.meta.url)),
      // @clean/core/domain
      '@domain': fileURLToPath(
        new URL('./src/@clean/core/domain', import.meta.url)
      ),
      // @clean/core/application
      '@application': fileURLToPath(
        new URL('./src/@clean/core/application', import.meta.url)
      ),
      // @clean/core
      '@core': fileURLToPath(new URL('./src/@clean/core', import.meta.url)),
      // @clean
      '@clean': fileURLToPath(new URL('./src/@clean', import.meta.url)),
      // Vue Defaults
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@images': fileURLToPath(
        new URL('./src/assets/images/', import.meta.url)
      ),
      '@styles': fileURLToPath(
        new URL('./src/assets/styles/', import.meta.url)
      )
    }
  }
})
