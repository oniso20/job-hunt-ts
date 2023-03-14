import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createVuePlugin } from 'vite-plugin-vue2';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), createVuePlugin()],
});
