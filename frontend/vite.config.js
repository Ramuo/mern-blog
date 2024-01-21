import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
      exclude: [],
    }),
  ],
  server: {
   //Proxy
   proxy: {
    '/api': 'http://localhost:5000',
    "/uploads": "http://localhost:5000",
   }
  }
})
