import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base` must match your GitHub repository name for GitHub Pages.
// If your repo is https://github.com/<user>/portfolio, keep '/portfolio/'.
// If you deploy to <user>.github.io (root site), change it to '/'.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/portfolio/',
})
