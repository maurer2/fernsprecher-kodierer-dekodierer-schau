import { style } from '@vanilla-extract/css';

export const Wrapper = style({
  display: 'flow-root', // new BFC to contain child margins of headline
  minHeight: '100vh',
});
