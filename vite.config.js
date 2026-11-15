import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  root: './',
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  },
  plugins: [
    {
      name: 'copy-config-and-assets',
      closeBundle() {
        // Ensure wedding-config.js is copied to dist/
        if (fs.existsSync('wedding-config.js')) {
          fs.copyFileSync('wedding-config.js', path.join('dist', 'wedding-config.js'));
        }
        // Ensure assets/images are copied to dist/assets/images
        const targetImgDir = path.join('dist', 'assets', 'images');
        fs.mkdirSync(targetImgDir, { recursive: true });
        if (fs.existsSync(path.join('assets', 'images'))) {
          const files = fs.readdirSync(path.join('assets', 'images'));
          for (const file of files) {
            fs.copyFileSync(
              path.join('assets', 'images', file),
              path.join(targetImgDir, file)
            );
          }
        }
      }
    }
  ]
});
