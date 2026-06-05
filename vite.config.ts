import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import path from 'path';

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: [
        path.resolve(__dirname, 'src/sections'),
        path.resolve(__dirname, 'src/components'),
        path.resolve(__dirname, 'src/vectors'),
      ],
      helpers: {
        eq: (a: string, b: string) => a === b,
      },
    }),
  ],
});
