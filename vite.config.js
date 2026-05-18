import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Laboratorium-5/',
  plugins: [
    tailwindcss(),
  ],
})
