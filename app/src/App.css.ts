import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flow-root', // new BFC to contain child margins of headline
  minHeight: '100vh',
});
