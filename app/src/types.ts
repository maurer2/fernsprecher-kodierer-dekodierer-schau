import { Codec } from './features/calls/store/calls.types';

export const COLOURS = {
  maniacMansion: '#003f5c',
  purpleCorallite: '#58508d',
  berryBoost: '#bc5090',
  fusionRed: '#ff6361',
  cheese: '#ffa600',
  black: '#000',
  white: '#fff',
  gray: '#c3c3c3',
} as const; // satisfies Record<string, string>; vanilla-extract issue with TS 4.9
type Colour = keyof typeof COLOURS;

export type CodecColourMapping = Record<Codec, Colour>;
export const codecColourMap: CodecColourMapping = {
  'G.711': 'berryBoost',
  'G.722': 'fusionRed',
  'G.726': 'cheese',
  'G.729': 'maniacMansion',
  Unknown: 'purpleCorallite',
};
