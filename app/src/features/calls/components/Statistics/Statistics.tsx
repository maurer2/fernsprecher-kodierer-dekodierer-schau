import React, { VFC, Fragment } from 'react';

import * as Types from './Statistics.types';
import { colourCodecMap } from '../PieChart/constants';

const Statistics: VFC<Readonly<Types.StatisticsProps>> = ({ codecStatistics }) => {
  const digitsAll = codecStatistics.reduce(
    (total, current) => {
      // const percentageDigits = current[1].toFixed(2).toString().length;
      const countDigits = current[2].toString().length;

      // total['percentage'] = total['percentage'].concat(percentageDigits);
      total['count'] = total['count'].concat(countDigits);

      return total;
    },
    {
      percentage: [] as number[],
      count: [] as number[],
    }
  );

  // const numberOfDigitsForPercentage = Math.max(...digitsAll.percentage);
  const numberOfDigitsForCount = Math.max(...digitsAll.count);

  return (
    <dl>
      {codecStatistics.map(([name, percentage, count]) => (
        <Fragment key={name}>
          <dt>{name}:</dt>
          <dd>{percentage.toFixed(2)}%</dd>
          <dd>{String(count).padStart(numberOfDigitsForCount, '0')}</dd>
          <dd>
            <span
              style={{
                display: 'inline-block',
                width: '1ch',
                height: '1ch',
                background: `${colourCodecMap[name]}`,
              }}
            />
          </dd>
        </Fragment>
      ))}
    </dl>
  );
};

export default Statistics;
