import { styled } from './global.styles';

export const Wrapper = styled('div', {
  display: 'flow-root', // new BFC to contain child margins of headline
  minHeight: '100vh',
});
