import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../../theme.css';

export const Navigation = style({
  position: 'sticky',
  top: 0,
  display: 'grid',
  gridTemplateColumns: '1fr repeat(2, minmax(max-content, 100px))',
  overflow: 'hidden',
  background: vars.colour.maniacMansion,
});

export const LinkList = style({
  display: 'flex',
  padding: 0,
  margin: 0,
  overflow: 'scroll',
  overflowY: 'hidden',
  listStyle: 'none',
  overscrollBehaviorX: 'contain',
  scrollbarGutter: 'auto',
  WebkitOverflowScrolling: 'touch', // vendor prefix needs to be uppercase and without initial dash

  // scrollbar styling
  scrollbarColor: `${vars.colour.maniacMansion} ${vars.colour.white}`,
  scrollbarWidth: 'thin',

  '::-webkit-scrollbar': {
    height: '0.5rem',
  },
  // rectangle
  '::-webkit-scrollbar-thumb': {
    background: vars.colour.maniacMansion,
  },
  // bg
  '::-webkit-scrollbar-track': {
    background: vars.colour.berryBoost,
  },
});

export const LinkListEntry = style({
  display: 'contents',
});

export const LinkBase = style({
  padding: '0.5rem 1rem',
  borderTop: 0,
  borderBottom: 0,
  textDecoration: 'none',
  textAlign: 'center',

  ':hover': {
    background: vars.colour.white,
    color: vars.colour.maniacMansion,
  },

  selectors: {
    // no left border for first child
    '& + &': { // todo
      borderLeft: '1px solid currentColor',
      background: 'red',
    },
  },
});
export const Link = styleVariants({
  LinkDefault: [
    LinkBase,
    {
      background: vars.colour.purpleCorallite,
      color: vars.colour.white,
    },
  ],
  LinkActive: [
    LinkBase,
    {
      background: vars.colour.maniacMansion,
      color: vars.colour.white,
    },
  ],
});

export const NavButton = style({
  display: 'flex',
  padding: 0,
  justifyContent: 'center',
  alignItems: 'baseline',
  border: 0,
  fontSize: '2rem',
  cursor: 'pointer',
  background: vars.colour.berryBoost,
  color: vars.colour.white,

  selectors: {
    '&:not([disabled]):hover': {
      background: vars.colour.white,
      color: vars.colour.berryBoost,
    },
    '&[disabled]': {
      cursor: 'auto',
      background: vars.colour.berryBoost,
      filter: 'brightness(0.5)',
    },
  },
});
