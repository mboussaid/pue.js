import { defineConfig } from "vite";

export default defineConfig({
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: 'src/index.js',
        output: {
          file: 'test.min.js', // Set the output file name to 'test.min.js'
          format: 'es', // You can change the format as needed
        },
      },
      // Use the terser plugin to minify the output
    },
  });