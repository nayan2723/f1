import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'site/public',
    build: {
        outDir: '../../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'site/public/index.html'),
                drivers: resolve(__dirname, 'site/public/drivers.html'),
                teams: resolve(__dirname, 'site/public/teams.html'),
                cars: resolve(__dirname, 'site/public/cars.html'),
                circuits: resolve(__dirname, 'site/public/circuits.html'),
                regulations: resolve(__dirname, 'site/public/regulations.html'),
                compare: resolve(__dirname, 'site/public/compare.html'),
                "race-weekend": resolve(__dirname, 'site/public/race-weekend.html'),
                predictions: resolve(__dirname, 'site/public/predictions.html'),
                legacy: resolve(__dirname, 'site/public/legacy.html')
            },
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('primereact')) {
                            return 'vendor-primereact';
                        }
                        if (id.includes('framer-motion') || id.includes('motion')) {
                            return 'vendor-motion';
                        }
                        if (id.includes('@radix-ui')) {
                            return 'vendor-radix';
                        }
                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'vendor-react';
                        }
                        if (id.includes('lucide-react')) {
                            return 'vendor-lucide';
                        }
                        return 'vendor'; // Fallback for other node_modules
                    }
                }
            }
        }
    }
});
