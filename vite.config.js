import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,             // Permite usar 'test', 'expect' sin importarlos
    environment: 'jsdom',      // Simula el navegador
    setupFiles: './src/setupTests.js', // Configuración inicial
  },
})