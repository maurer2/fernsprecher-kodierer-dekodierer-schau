import type { CodecsStatistics } from '../../hooks/useCallStatistics/useCallStatistics.types';

export type StatisticsProps = {
  codecStatistics: CodecsStatistics;
};

export type DigitsCounts = {
  percentage: number[],
  count: number[],
};
