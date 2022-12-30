import { style } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

export const View = style({
  display: 'grid',
  minHeight: '100vh',
  gridTemplateColumns: `1fr min(${vars.width.contentMaxWidth}, 100%) 1fr`,
  gridTemplateRows: `
    auto
    1fr
  `,
});

export const Header = style({
  gridColumn: '1/-1',
  background: vars.colour.maniacMansion,
});

export const Content = style({
  gridColumn: '1/-1',
});

export const Title = style({
  margin: '1rem auto',
  maxWidth: vars.width.contentMaxWidth,
  fontSize: '2rem',
  color: vars.colour.white,
});

export const TitleLink = style({
  color: 'inherit',
  textDecoration: 'none',
});
