import type { FC } from 'react';

import type * as Types from './PieChart.types';
import * as Styles from './PieChart.css';

import { codecColourMap } from '../../../../types';
import { COLOURS } from '../../../../theme.css';

const PieChart: FC<Readonly<Types.PieChartProps>> = ({ codecStatistics }) => {
  const gradientSections = codecStatistics
    .filter(([, percentage]) => percentage !== 0)
    .reduce(
      (total, current, _, arr) => {
        const isLastSection = current === arr.at(-1);
        const colour = COLOURS[codecColourMap[current[0]]];
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
    <div className={Styles.Container}>
      {
      showPieChart
        ? (
          <div
            className={Styles.PieChart}
            style={{
              background: `conic-gradient(${gradientsSectionsString})`,
            }}
            data-testid="pie-chart"
          >
            <span className="visually-hidden">Pie chart</span>
          </div>
        )
        : (
          <aside className={Styles.Alert} data-testid="pie-chart-fallback">
            <p>Chart cannot be shown.</p>
          </aside>
        )
      }
    </div>
  );
};

export default PieChart;
