import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is served from https://hisham-cs.github.io/portfolio/ by the
// GitHub Actions workflow in .github/workflows/deploy.yml, so every built
// URL is prefixed with /portfolio/.
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})
