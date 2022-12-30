import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../../theme.css';
import { codecColourMap, COLOURS } from '../../../../types';

export const Table = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr min-content min-content',
  borderTop: `1px solid ${vars.colour.gray}`,
  borderRight: `1px solid ${vars.colour.gray}`,
});

export const IgnoredTableElement = style({
  display: 'contents',
});

export const TableCellBase = style({
  padding: '0.5rem',
  borderLeft: `1px solid ${vars.colour.gray}`,
  borderBottom: `1px solid ${vars.colour.gray}`,

  // ':where(tr:nth-child(odd)) td': {
  // background: theme.colors.gray,
  // },
});
export const TableCellVariants = styleVariants({
  colSpan: {
    gridColumn: 'span 2',
    textAlign: 'right',
  },
});

export const TableCellHead = style({
  // todo inheritance
  padding: '0.5rem',
  borderLeft: `1px solid ${vars.colour.gray}`,
  borderBottom: `1px solid ${vars.colour.gray}`,

  background: vars.colour.purpleCorallite,
  color: vars.colour.white,
  textAlign: 'left',
});

export const TableCellFoot = style({
  // todo inheritance
  padding: '0.5rem',
  borderLeft: `1px solid ${vars.colour.gray}`,
  borderBottom: `1px solid ${vars.colour.gray}`,

  borderTop: `1px solid ${vars.colour.gray}`,
  fontWeight: 'bold',
});

export const ColourIndicatorBase = style({
  display: 'block',
  width: 'min-content',
  margin: 'auto',

  '::before': {
    content: '\u25A0', // rectangle https://en.wikipedia.org/wiki/Geometric_Shapes_(Unicode_block)
  },
});

export const ColourIndicatorVariants = styleVariants({
  // codec: {
  G711: {
    color: COLOURS[codecColourMap['G.711']],
  },
  G722: {
    color: COLOURS[codecColourMap['G.722']],
  },
  G726: {
    color: COLOURS[codecColourMap['G.726']],
  },
  G729: {
    color: COLOURS[codecColourMap['G.729']],
  },
  Unknown: {
    color: COLOURS[codecColourMap.Unknown],
  },
});
