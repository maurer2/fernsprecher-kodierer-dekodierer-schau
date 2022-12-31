import { style, styleVariants } from '@vanilla-extract/css';
import { vars, COLOURS } from '../../../../theme.css';
import { codecColourMap } from '../../../../types';

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
});
export const TableCellWithColSpan = styleVariants({
  ColSpan2: [
    TableCellBase,
    {
      gridColumn: 'span 2',
      textAlign: 'right',
    },
  ],
});

export const TableCellHead = style([
  TableCellBase,
  {
    background: vars.colour.purpleCorallite,
    color: vars.colour.white,
    textAlign: 'left',
  },
]);

export const TableCellBody = style([TableCellBase, {}]);

export const TableCellFoot = style([
  TableCellWithColSpan.ColSpan2,
  {
    fontWeight: 'bold',
  },
]);

export const ColourIndicatorBase = style({
  display: 'block',
  width: 'min-content',
  margin: 'auto',

  '::before': {
    content: '\u25A0', // rectangle https://en.wikipedia.org/wiki/Geometric_Shapes_(Unicode_block)
  },
});
export const ColourIndicator = styleVariants({
  G711: [
    ColourIndicatorBase,
    {
      color: COLOURS[codecColourMap['G.711']],
    },
  ],
  G722: [
    ColourIndicatorBase,
    {
      color: COLOURS[codecColourMap['G.722']],
    },
  ],
  G726: [
    ColourIndicatorBase,
    {
      color: COLOURS[codecColourMap['G.726']],
    },
  ],
  G729: [
    ColourIndicatorBase,
    {
      color: COLOURS[codecColourMap['G.729']],
    },
  ],
  Unknown: [
    ColourIndicatorBase,
    {
      color: COLOURS[codecColourMap.Unknown],
    },
  ],
});
