import React, { Fragment, VFC, useMemo } from 'react';

import * as Types from './PieChart.types';

const PieChart: VFC<Readonly<Types.PieChartProps>> = ({ numberOfCodecs, codecStatistics }) => {
  const colours = ['red', 'green', 'blue', 'yellow', 'orange', 'deeppink'];

  const gradientSections = codecStatistics.reduce(
    (total, current, index) => {
      const colour = colours[index]; // todo wrap around
      const endValue = total.startValue + current[1];

      const section = `${colour} ${total.startValue.toFixed(5)}% ${endValue.toFixed(5)}%`;

      const newTotal = {
        startValue: total.startValue + current[1],
        sections: total.sections.concat(section),
      };

      return newTotal;
    },
    {
      startValue: 0,
      sections: [] as string[],
    }
  );

  const gradientsSectionsString = gradientSections.sections.join(', ');
  const pieChartStyle = {
    width: '250px',
    height: '250px',
    background: `conic-gradient(${gradientsSectionsString})`,
    borderRadius: '50%',
  };

  return (
    <div className="container">
      <h2>Pie chart</h2>
      <div className="pie-chart" style={pieChartStyle} />
    </div>
  );
};

export default PieChart;
