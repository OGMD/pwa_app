import { defineConfig, transformWithEsbuild, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'


// https://vitejs.dev/config/
export default({mode}) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd())};

  const URL = process.env.VITE_SERVER_URL || "http://localhost:4000";
return defineConfig({
  
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/))  return null

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        })
      },
    },
    svgr(),
    react(),
    VitePWA({
      manifest:{
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        lang: 'en-En',
        name: 'FlexeSeal',
        short_name: 'EjemploV1',
        description: 'EjemploPWA',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
              src: 'pwa-64x64.png',
              sizes: '64x64',
              type: 'image/png'
          },
          {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
          },
          {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
          },
          {
              src: 'maskable-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
          }
      ],
      }
    })
  ],
  esbuild: {
    loader: "jsx",
    include: [
      // Add this for business-as-usual behaviour for .jsx and .tsx files
      "src/**/*.jsx",
      "src/**/*.tsx",
      "node_modules/**/*.jsx",
      "node_modules/**/*.tsx",


      // --- OR ---
      "src\pages\ble.js",
      // Add these lines to allow all .js files to contain JSX
      "src/**/*.js",
      "node_modules/**/*.js",

      // Add these lines to allow all .ts files to contain JSX
      "src/**/*.ts",
      "node_modules/**/*.ts",
    ],
    exclude: [],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      }
    },
  },
  server:{
    proxy:{
      '/socket.io':{
        //target:'http://localhost:4000',
        target: `${URL}`,
        ws:true
      }
    }
  },
  preview:{
    port: 3333
  }
})
}
