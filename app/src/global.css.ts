import { globalStyle } from '@vanilla-extract/css';

const COLOURS = {
  maniacMansion: '#003f5c',
  purpleCorallite: '#58508d',
  berryBoost: '#bc5090',
  fusionRed: '#ff6361',
  cheese: '#ffa600',
  black: '#000',
  white: '#fff',
  gray: '#c3c3c3',
} as const; // satisfies Record<string, string>; // vanilla-extract issue with TS 4.9
// type Colour = keyof typeof COLOURS;

globalStyle('html', {
  margin: 0,
  fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
  background: 'fff',
  overflowY: 'scroll',
});

globalStyle('body', {
  scrollbarGutter: 'stable both-edges',
  background: 'fff',
});

globalStyle('code', {
  fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, \'Courier New\', monospace',
});

globalStyle('dl', {
  display: 'inline-grid',
  gridTemplateColumns: 'max-content 1fr min-content min-content',
  gridGap: '1rem',
});

globalStyle('.visually-hidden:not(:focus):not(:active)', {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
});
