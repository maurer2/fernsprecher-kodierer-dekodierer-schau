import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import checker from 'vite-plugin-checker';
import { visualizer } from 'rollup-plugin-visualizer';

import type { PluginOption } from 'vite';

export default {
  server: {
    open: false,
  },
  plugins: [
    react(),
    vanillaExtractPlugin({
      identifiers: 'debug',
    }),
    checker({
      typescript: true,
    }),
    visualizer({
      template: 'treemap',
      filename: 'statistics/statistics.html',
      gzipSize: true,
      brotliSize: true,
      open: true,
    }) satisfies PluginOption,
  ],
};
