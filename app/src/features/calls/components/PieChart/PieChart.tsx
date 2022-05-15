import React, { FC } from 'react';

import * as Types from './PieChart.types';
import * as Styles from './PieChart.styles';

import { colourCodecMap } from './constants';

const PieChart: FC<Readonly<Types.PieChartProps>> = ({ codecStatistics }) => {
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
    },
  );

  const gradientsSectionsString = gradientSections.sections.join(', ');
  const gradientBackgroundStyle = {
    background: `conic-gradient(${gradientsSectionsString})`,
  };

  return (
    <Styles.Container>
      <Styles.PieChart
        style={gradientBackgroundStyle}
      >
        <span className="visually-hidden">Pie chart</span>
      </Styles.PieChart>
    </Styles.Container>
  );
};

export default PieChart;
