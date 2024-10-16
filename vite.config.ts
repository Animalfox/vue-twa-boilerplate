import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true, // enable jest-like global test APIs
    environment: 'happy-dom', // simulate DOM with happy-dom
    exclude: [...configDefaults.exclude] // exclude certain directories
  },
})
