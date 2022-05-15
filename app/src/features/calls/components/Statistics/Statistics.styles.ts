import { styled, theme } from '../../../../global.styles';
// import { colourCodecMap } from '../PieChart/constants';

export const Table = styled('table', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr min-content min-content',
  borderTop: `1px solid ${theme.colors.gray}`,
  borderRight: `1px solid ${theme.colors.gray}`,
});

// https://github.com/modulz/stitches/issues/214
export const IgnoredTableElement = styled('div', {
  display: 'contents',
});

export const TableCell = styled('td', {
  padding: '0.5rem',
  borderLeft: `1px solid ${theme.colors.gray}`,
  borderBottom: `1px solid ${theme.colors.gray}`,

  // ':where(tr:nth-child(odd)) td': {
  // background: theme.colors.gray,
  // },

  variants: {
    colSpan: {
      2: {
        gridColumn: 'span 2',
        textAlign: 'right',
      },
    },
  },
});

export const TableCellHead = styled(TableCell, {
  background: theme.colors.purpleCorallite,
  color: theme.colors.white,
  textAlign: 'left',
});

export const TableCellFoot = styled(TableCell, {
  borderTop: `1px solid ${theme.colors.gray}`,
  fontWeight: 'bold',
});

export const ColourIndicator = styled('span', {
  display: 'block',
  width: 'min-content',
  margin: 'auto',

  '&:before': {
    content: '\u25A0', // rectangle https://en.wikipedia.org/wiki/Geometric_Shapes_(Unicode_block)
  },

  // variants: {
  //   codec: {
  //     'G.711': {
  //       color: colourCodecMap['G.711'],
  //     },
  //     'G.722': {
  //       color: colourCodecMap['G.722'],
  //     },
  //     'G.726': {
  //       color: colourCodecMap['G.726'],
  //     },
  //     'G.729': {
  //       color: colourCodecMap['G.729'],
  //     },
  //     Unknown: {
  //       color: colourCodecMap.Unknown,
  //     },
  //   },
  // },
});
