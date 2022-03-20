import type { CodecsStatistics } from '../../hooks/useCallStatistics/useCallStatistics.types';
import { COLOURS } from './constants';

export type PieChartProps = {
  numberOfCodecs: number;
  codecStatistics: CodecsStatistics;
};

export type Colour = typeof COLOURS[number];
