import type { Codec } from './features/calls/store/calls.types';
import { COLOURS } from './theme.css';

export type ColourName = keyof typeof COLOURS;
export type ColourValue = typeof COLOURS[ColourName];

export const codecColourMap: Record<Codec, ColourValue> = {
  'G.711': COLOURS.berryBoost,
  'G.722': COLOURS.fusionRed,
  'G.726': COLOURS.cheese,
  'G.729': COLOURS.maniacMansion,
  Unknown: COLOURS.purpleCorallite,
} as const;
