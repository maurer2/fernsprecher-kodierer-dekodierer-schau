import { NavLink } from 'react-router-dom';
import { styled, theme } from '../../global.styles';

export const View = styled('article', {
  display: 'grid',
  minHeight: '100vh',
  gridTemplateColumns: `1fr min(${theme.sizes.contentMaxWidth}, 100%) 1fr`,
  gridTemplateRows: `
    auto
    1fr
  `,
});

export const Header = styled('header', {
  gridColumn: '1/-1',
  background: theme.colors.maniacMansion,
});

export const Content = styled('main', {
  gridColumn: '1/-1',
});

export const Title = styled('h1', {
  margin: '1rem auto',
  maxWidth: theme.sizes.contentMaxWidth,
  fontSize: '2rem',
  color: theme.colors.white,
});

export const TitleLink = styled(NavLink, {
  color: 'inherit',
  textDecoration: 'none',
});
