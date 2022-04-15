import { styled } from '@stitches/react';
import { NavLink } from 'react-router-dom';

export const Link = styled(NavLink, {
  textDecoration: 'none',
  variants: {
    status: {
      default: {
        background: 'fff',
        color: '#00e',
      },
      active: {
        background: '#00e',
        color: '#fff',
        borderColor: '#00e',
        textDecoration: 'none',
      },
    }
  },
});
