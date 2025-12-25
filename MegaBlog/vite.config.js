import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  // resolve: {
  //   alias: {
  //     "@tinymce/tinymce-react": "@tinymce/tinymce-react/dist/tinymce-react.js", // Example path, verify the actual file path in node_modules
  //   },
  // },
});
