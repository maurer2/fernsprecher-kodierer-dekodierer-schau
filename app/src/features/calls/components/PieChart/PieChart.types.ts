import type * as CSS from 'csstype';
import { Codec } from '../../store/calls.types';
import type { CodecsStatistics } from '../../hooks/useCallStatistics/useCallStatistics.types';

const COLOURS = ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'] as const;

export type PieChartProps = {
  numberOfCodecs: number;
  codecStatistics: CodecsStatistics;
};

export type Colour = typeof COLOURS[number];

export type ColourCodec = Record<Codec, Colour>;

export type ColourGradientSection = `${CSS.Property.Color} ${string}% ${string}%`;
