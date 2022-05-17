import React, { FC } from 'react';

import * as Types from './PieChart.types';
import * as Styles from './PieChart.styles';

import { colourCodecMap } from './constants';

const PieChart: FC<Readonly<Types.PieChartProps>> = ({ codecStatistics }) => {
  const gradientSections = codecStatistics
    .filter(([, percentage]) => percentage !== 0)
    .reduce(
      (total, current) => {
        const colour = colourCodecMap[current[0]];
        const endValue = total.startValue + current[1];

        const section: Types.ColourGradientSection = `${colour} ${total.startValue.toFixed(5)}% ${endValue.toFixed(5)}%`;

        const newTotal = {
          startValue: total.startValue + current[1],
          sections: total.sections.concat(section),
        };

        return newTotal;
      },
      {
        startValue: 0,
        sections: [] as Types.ColourGradientSection[],
      },
    );

  const gradientsSectionsString = gradientSections.sections.join(', ');

  return (
    <Styles.Container>
      <Styles.PieChart
        css={{
          background: `conic-gradient(${gradientsSectionsString})`,
        }}
      >
        <span className="visually-hidden">Pie chart</span>
      </Styles.PieChart>
    </Styles.Container>
  );
};

export default PieChart;
