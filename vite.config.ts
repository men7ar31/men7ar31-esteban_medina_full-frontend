import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',  // Asegura que los assets se carguen correctamente en Vercel
  build: {
    outDir: 'dist',
  },
  server: {
    open: true, // Abre automáticamente el navegador en desarrollo
  },
  preview: {
    port: 4173, // Asegura que el preview de Vite use un puerto distinto
  },
  
})
