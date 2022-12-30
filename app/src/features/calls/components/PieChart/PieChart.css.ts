import { style } from '@vanilla-extract/css';
import { vars } from '../../../../theme.css';

export const Container = style({});

export const PieChart = style({
  width: '250px',
  height: '250px',
  margin: 'auto',
  borderRadius: '50%',
});

export const Alert = style({
  marginBottom: '1rem',
  padding: '1rem',
  border: `1px solid ${vars.colour.gray}`,
  textAlign: 'center',

  // selectors: {
  //   '& > p': {
  //     margin: 0,
  //   },
  // },
});
