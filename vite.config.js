import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Gym-/'   // هنا حط اسم الريبو الخاص بك على GitHub
})
