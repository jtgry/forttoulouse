import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  legacy: {
    collections: true
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
