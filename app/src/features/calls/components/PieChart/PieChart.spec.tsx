/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render } from '@testing-library/react';

import Component from './PieChart';
import * as Types from './PieChart.types';

describe('PieChart', () => {
  const propsDefault: Types.PieChartProps = {
    numberOfCodecs: 10,
    codecStatistics: [
      ['G.729', 40, 4],
      ['G.711', 20, 2],
      ['G.722', 20, 2],
      ['Unknown', 20, 2],
      ['G.726', 0, 0],
    ],
  };

  const setup = (props?: Types.PieChartProps) => render(
    <Component
      {...propsDefault}
      {...props}
    />,
  );

  it('renders', () => {
    const { getByTestId, queryByTestId } = setup();

    expect(getByTestId('pie-chart')).toBeInTheDocument();
    expect(queryByTestId('pie-chart-fallback')).not.toBeInTheDocument();
  });

  it.todo('shows fallback text if no statistic is present');
  it.todo('chart should not show more than 100%');
  it.todo('chart should not show empty lines');
  it.todo('chart sections should be ordered');
});
