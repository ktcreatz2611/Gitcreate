import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './', // Use relative base for GitHub Pages compatibility
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                    'framer-motion': ['framer-motion'],
                    'ui-libs': ['lucide-react'],
                },
            },
        },
    },
})
