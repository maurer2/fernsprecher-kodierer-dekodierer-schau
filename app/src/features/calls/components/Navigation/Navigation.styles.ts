import { NavLink } from 'react-router-dom';
import { styled, theme } from '../../../../global.styles';

export const Nav = styled('nav', {
  display: 'grid',
  margin: '0.5rem',
  gridTemplateColumns: 'repeat( auto-fit, minmax(150px, 1fr))',
  gridGap: '0.5rem',
});

export const Link = styled(NavLink, {
  padding: '0.5rem 1rem',
  borderWidth: '1px',
  borderStyle: 'solid',
  textDecoration: 'none',
  appearance: 'button',
  variants: {
    status: {
      default: {
        borderColor: theme.colors.purpleCorallite,
        color: theme.colors.purpleCorallite,
      },
      active: {
        background: theme.colors.purpleCorallite,
        color: theme.colors.white,
      },
    },
  },
});
