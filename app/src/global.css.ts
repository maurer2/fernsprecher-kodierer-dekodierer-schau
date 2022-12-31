import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('html', {
  margin: 0,
  fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
  background: vars.colour.white,
  overflowY: 'scroll',
});

globalStyle('body', {
  scrollbarGutter: 'stable both-edges',
  background: vars.colour.white,
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
