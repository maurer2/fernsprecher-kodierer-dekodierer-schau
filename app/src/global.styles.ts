import { createStitches } from '@stitches/react';

const { css, styled, theme } = createStitches({
  theme: {
    colors: {
      maniacMansion: '#003f5c',
      purpleCorallite: '#58508d',
      berryBoost: '#bc5090',
      fusionRed: '#ff6361',
      cheese: '#ffa600',
      black: '#000',
      white: '#fff',
    },
  },
  utils: {
    noBleed: () => ({
      gridColumn: 2,
    }),
    fullBleed: () => ({
      width: '100%',
      gridColumn: '1 / -1',
    }),
  },
});

export { css, styled, theme };
