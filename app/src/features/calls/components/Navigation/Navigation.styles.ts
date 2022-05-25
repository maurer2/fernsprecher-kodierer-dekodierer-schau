import { NavLink } from 'react-router-dom';
import { styled, theme } from '../../../../global.styles';

export const Navigation = styled('nav', {
  position: 'sticky',
  top: 0,
  display: 'grid',
  gridTemplateColumns: '1fr repeat(2, minmax(max-content, 100px))',
  overflow: 'hidden',
  background: theme.colors.maniacMansion,
});

export const LinkList = styled('ul', {
  display: 'flex',
  padding: 0,
  margin: 0,
  overflow: 'scroll',
  overflowY: 'hidden',
  listStyle: 'none',
  // overscrollBehaviourX: 'contain', // doesn't work
  'overscroll-behavior-x': 'contain',
  scrollbarGutter: 'auto',
  '-webkit-overflow-scrolling': 'touch',

  // scrollbar styling
  scrollbarColor: `${theme.colors.maniacMansion} ${theme.colors.white}`,
  scrollbarWidth: 'thin',

  '&::-webkit-scrollbar': {
    height: '0.5rem',
  },
  // rectangle
  '&::-webkit-scrollbar-thumb': {
    background: theme.colors.maniacMansion,
  },
  // bg
  '&::-webkit-scrollbar-track': {
    background: theme.colors.white,
  },
});

export const LinkListEntry = styled('li', {
  display: 'contents',
});

export const Link = styled(NavLink, {
  padding: '0.5rem 1rem',
  borderTop: 0,
  borderBottom: 0,
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
  display: 'flex',
  padding: 0,
  justifyContent: 'center',
  alignItems: 'baseline',
  border: 0,
  fontSize: '2rem',
  cursor: 'pointer',
  background: theme.colors.berryBoost,
  color: theme.colors.white,

  '&:not([disabled]):hover': {
    background: theme.colors.white,
    color: theme.colors.berryBoost,
  },

  '&[disabled]': {
    cursor: 'auto',
    background: theme.colors.berryBoost,
    filter: 'brightness(0.5)',
  },

  // https://github.com/modulz/stitches/issues/447
  // variants: {
  //   disabled: {
  //     true: {
  //       background: theme.colors.berryBoost,
  //       cursor: 'auto',
  //     },
  //   },
  // },
});
