import { styled, theme } from './global.styles';

export const Wrapper = styled('article', {
  display: 'grid',
  minHeight: '100vh',
  gridTemplateColumns: '1fr min(75rem, 100%) 1fr',
  gridTemplateRows: `
    1fr
  `,
  background: theme.colors.white,

  '& > *': {
    gridColumn: 2,
  },
});

export const Main = styled('main', {});
