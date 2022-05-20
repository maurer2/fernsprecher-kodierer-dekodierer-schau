import type * as CSS from 'csstype';
import type { CodecsStatistics } from '../../hooks/useCallStatistics/useCallStatistics.types';

export type PieChartProps = {
  numberOfCodecs: number;
  codecStatistics: CodecsStatistics;
};

export type ColourGradientSection = `${CSS.Property.Color} ${string}% ${string}%`;
