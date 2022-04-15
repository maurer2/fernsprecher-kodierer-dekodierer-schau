import { styled } from '@stitches/react';

export const Wrapper = styled('article', {
  display: 'grid',
  minHeight: '100vh',
  gridTemplateColumns: `1fr min(75rem, 100%) 1fr`,
  gridTemplateRows: `
    1fr
  `,

  '& > *': {
    gridColumn: 2,
  }
});

export const Main = styled('main', {});
