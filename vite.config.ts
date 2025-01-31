import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import packageJson from './package.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
	"import.meta.env.VERSION": JSON.stringify(packageJson.version)
  },
})
