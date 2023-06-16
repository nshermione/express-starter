import { FileUtils } from '../../core/Utils.mjs';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function resolve(filePath) {
  return FileUtils.resolveFilePath({ meta: import.meta, filePath });
}

console.log("rool up options", resolve('./public/js/home.js'))

export default defineConfig({
  plugins: [vue()],
  build: {
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      output: {
        dir: resolve('./dist')
      },
      // overwrite default .html entry
      input: {
        main: resolve('./client/main.js')
      }
    },
  },
})