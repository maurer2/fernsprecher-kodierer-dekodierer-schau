import { createStitches, globalCss } from '@stitches/react';

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

const GlobalStyles = globalCss({
  html: {
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
  },
  code: {
    fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, \'Courier New\', monospace',
  },
  dl: {
    display: 'inline-grid',
    gridTemplateColumns: 'max-content 1fr min-content min-content',
    gridGaps: '1rem',
  },
});

export {
  css, styled, theme, GlobalStyles,
};
