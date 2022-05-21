import { NavLink } from 'react-router-dom';
import { styled, theme } from '../../../../global.styles';

export const Navigation = styled('nav', {
  display: 'grid',
  gridTemplateColumns: '1fr repeat(2, minmax(max-content, 125px))',
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
  overscrollBehaviourX: 'contain', // doesn't work
  'overscroll-behavior-x': 'contain',

});

export const LinkListEntry = styled('li', {
  display: 'contents',
});

export const Link = styled(NavLink, {
  padding: '0.5rem 1rem',
  borderTop: '0',
  borderBottom: '0',
  // borderRight: '1px solid currentColor',
  textDecoration: 'none',
  textAlign: 'center',

  '&:hover': {
    background: theme.colors.white,
    color: theme.colors.maniacMansion,
  },

  // no left border for first child
  [`${LinkListEntry} + ${LinkListEntry} &`]: {
    borderLeft: '1px solid currentColor',
  },

  variants: {
    status: {
      default: {
        background: theme.colors.purpleCorallite,
        color: theme.colors.white,
      },
      active: {
        background: theme.colors.maniacMansion,
        color: theme.colors.white,
      },
    },
  },
});

export const NavButton = styled('button', {
  cursor: 'pointer',
});
