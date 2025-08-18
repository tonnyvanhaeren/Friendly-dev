import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import devToolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
  plugins: [devToolsJson(), tailwindcss(), reactRouter(), tsconfigPaths()],
});
