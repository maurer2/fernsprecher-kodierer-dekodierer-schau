import { styled, theme } from '../../../../global.styles';

export const StatisticsTable = styled('table', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  // gridGap: '1rem',
});

// https://github.com/modulz/stitches/issues/214
export const IgnoredTableElement = styled('div', {
  display: 'contents',
});

export const StatisticsTableHead = styled(IgnoredTableElement, {});
// StatisticsTableHead.defaultProps = { as: 'thead' }; // TS error

export const StatisticsTableBody = styled(IgnoredTableElement, {});
// StatisticsTableBody.defaultProps = { as: 'tbody' }; // TS error

export const StatisticsTableFoot = styled(IgnoredTableElement, {});
// StatisticsTableFoot.defaultProps = { as: 'tfoot' }; // TS error

export const StatisticsTableRow = styled(IgnoredTableElement, {});
// StatisticsTableRow.defaultProps = { as: 'tr' }; // TS error

export const StatisticsTableHeadColumn = styled('th', {
  background: 'red',
});

export const StatisticsTableColumn = styled('td', {
  background: 'green',
});
