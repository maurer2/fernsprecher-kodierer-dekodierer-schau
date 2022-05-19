import React, { FC } from 'react';

import * as Types from './PieChart.types';
import * as Styles from './PieChart.styles';

import { colourCodecMap } from './constants';

const PieChart: FC<Readonly<Types.PieChartProps>> = ({ codecStatistics }) => {
  const gradientSections = codecStatistics
    .filter(([, percentage]) => percentage !== 0)
    .reduce(
      (total, current, _, arr) => {
        const isLastSection = current === arr.at(-1);
        const colour = colourCodecMap[current[0]];
        const endValue = isLastSection ? 100 : total.startValue + current[1];

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
  const showPieChart = Boolean(codecStatistics.length);

  return (
    <Styles.Container>
      {
      showPieChart
        ? (
          <Styles.PieChart
            css={{
              background: `conic-gradient(${gradientsSectionsString})`,
            }}
            data-testid="pie-chart"
          >
            <span className="visually-hidden">Pie chart</span>
          </Styles.PieChart>
        )
        : (
          <Styles.Alert data-testid="pie-chart-fallback">
            <p>Chart can not be shown.</p>
          </Styles.Alert>
        )
      }
    </Styles.Container>
  );
};

export default PieChart;
