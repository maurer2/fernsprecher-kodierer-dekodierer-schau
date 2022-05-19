import { styled, theme } from '../../../../global.styles';

export const Container = styled('div', {});

export const PieChart = styled('div', {
  width: '250px',
  height: '250px',
  margin: 'auto',
  borderRadius: '50%',
});

export const Alert = styled('aside', {
  marginBottom: '1rem',
  padding: '1rem',
  border: `1px solid ${theme.colors.gray}`,
  textAlign: 'center',

  '> p': {
    margin: 0,
  },
});
