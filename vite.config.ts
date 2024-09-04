import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { resolve } from 'path';
const host = 'localhost';

export default defineConfig({

    plugins: [
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.ts'],
            refresh: true,
        }),
    ],
    optimizeDeps: {
        include: ['lodash', 'moment']
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname + '/resources/js'),
            '@node': path.resolve(__dirname + '/node_modules'),
            vue: "vue/dist/vue.esm-bundler.js"
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    console.log(id);
                    if (id.includes('modules/orders')) {
                        return 'orders';
                    }
                },
            },
        },
    }
});
