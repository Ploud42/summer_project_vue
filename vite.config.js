import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    VitePWA({ registerType: 'autoUpdate',
              manifest: {
                name: "Little Game Project",
                background_color: "black",
                short_name: "Hero Game",
                display: "standalone",
                description: "Small personnal project",
                orientation: "portrait",
                start_url: "/",
                icons:[
                    {
                        "src":"img/icons/logoW.png",
                        "sizes":"72x72 96x96 128x128 256x256 512x512"
                    }
                ]
              }
            })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'process.env': {}
  }
})
