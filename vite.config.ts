import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/karban-task-manager-app/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})