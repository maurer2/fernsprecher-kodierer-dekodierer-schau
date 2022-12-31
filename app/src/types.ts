import { Codec } from './features/calls/store/calls.types';
import { COLOURS } from './theme.css';

export type Colour = keyof typeof COLOURS;

export type CodecColourMapping = Record<Codec, Colour>;
export const codecColourMap: CodecColourMapping = {
  'G.711': 'berryBoost',
  'G.722': 'fusionRed',
  'G.726': 'cheese',
  'G.729': 'maniacMansion',
  Unknown: 'purpleCorallite',
};
