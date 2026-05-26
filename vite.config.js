import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Laboratorium-6/',
  plugins: [
    tailwindcss(),
  ],
})
