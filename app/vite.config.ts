import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default {
  plugins: [
    react(),
    vanillaExtractPlugin({
      identifiers: 'debug',
    }),
  ],
};
