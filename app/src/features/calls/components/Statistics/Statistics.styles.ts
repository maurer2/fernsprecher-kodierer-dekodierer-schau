import { styled, theme } from '../../../../global.styles';

export const Table = styled('table', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  borderTop: `1px solid ${theme.colors.gray}`,
  borderRight: `1px solid ${theme.colors.gray}`,
});

// https://github.com/modulz/stitches/issues/214
export const IgnoredTableElement = styled('div', {
  display: 'contents',
});

// export const StatisticsTableHead = styled(IgnoredTableElement, {});
// StatisticsTableHead.defaultProps = { as: 'thead' }; // TS error

// export const StatisticsTableBody = styled(IgnoredTableElement, {});
// StatisticsTableBody.defaultProps = { as: 'tbody' }; // TS error

// export const StatisticsTableFoot = styled(IgnoredTableElement, {});
// StatisticsTableFoot.defaultProps = { as: 'tfoot' }; // TS error

// export const StatisticsTableRow = styled(IgnoredTableElement, {});
// StatisticsTableRow.defaultProps = { as: 'tr' }; // TS error

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
});

export const TableCellFoot = styled(TableCell, {
  borderTop: `1px solid ${theme.colors.gray}`,
  fontWeight: 'bold',
});

export const ColourIndicator = styled('span', {
  display: 'inline-block',
  width: '1ch',
  height: '1ch',
});
