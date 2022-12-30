import { createGlobalTheme } from '@vanilla-extract/css';

const COLOURS = {
  maniacMansion: '#003f5c',
  purpleCorallite: '#58508d',
  berryBoost: '#bc5090',
  fusionRed: '#ff6361',
  cheese: '#ffa600',
  black: '#000',
  white: '#fff',
  gray: '#c3c3c3',
} as const; // satisfies Record<string, string>; // vanilla-extract issue with TS 4.9

export const vars = createGlobalTheme(':root', {
  colour: COLOURS,
  width: {
    contentMaxWidth: '50rem', // temp
  },
});
