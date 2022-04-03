import React, { VFC } from 'react';

import * as Types from './PieChart.types';
import { colourCodecMap } from './constants';

const PieChart: VFC<Readonly<Types.PieChartProps>> = ({ codecStatistics }) => {
  const gradientSections = codecStatistics.reduce(
    (total, current) => {
      const colour = colourCodecMap[current[0]];
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
      <div
        className="pie-chart"
        style={pieChartStyle}
      >
        <span className="sr-only">Pie chart</span>
      </div>
    </div>
  );
};

export default PieChart;
