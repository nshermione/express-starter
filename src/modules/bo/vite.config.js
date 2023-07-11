import { FileUtils } from '../../core/Utils.js';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function resolve(filePath) {
  return FileUtils.resolvePath({ meta: import.meta, path: filePath });
}

export default defineConfig({
  plugins: [vue()],
  root: 'src/modules/bo',
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