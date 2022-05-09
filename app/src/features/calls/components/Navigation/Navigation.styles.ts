import { NavLink } from 'react-router-dom';
import { styled, theme } from '../../../../global.styles';

export const Nav = styled('nav', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(125px, 1fr))',
  gridGap: '1rem',
});

export const Link = styled(NavLink, {
  padding: '0.5rem 1rem',
  borderWidth: '1px',
  borderStyle: 'solid',
  textDecoration: 'none',
  appearance: 'button',
  textAlign: 'center',
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
