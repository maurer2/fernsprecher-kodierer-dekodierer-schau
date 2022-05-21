import { NavLink } from 'react-router-dom';
import { styled, theme } from '../../../../global.styles';

export const Navigation = styled('nav', {
  display: 'grid',
  gridTemplateColumns: '1fr min-content min-content',
  // gridGap: '0 1rem',
  overflow: 'hidden',
});

export const LinkList = styled('ul', {
  display: 'flex',
  padding: 0,
  margin: 0,
  overflow: 'scroll',
  overflowY: 'scroll',
  listStyle: 'none',
  background: theme.colors.cheese,
  overscrollBehaviourX: 'contain', // doesn't work
  'overscroll-behavior-x': 'contain',

});

export const LinkListEntry = styled('li', {
  display: 'contents',
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

export const NavButton = styled('button', {});
