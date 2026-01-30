import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/antrenman-takip-web/', // GitHub depo adın buraya gelmeli
})