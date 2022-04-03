import React, { VFC } from 'react';

import * as Types from './Statistics.types';
import { colourCodecMap } from '../PieChart/constants';

const Statistics: VFC<Readonly<Types.StatisticsProps>> = ({ codecStatistics }) => {
  const digitsAll = codecStatistics.reduce(
    (total, current) => {
      const countDigits = current[2].toString().length;

      total['count'] = total['count'].concat(countDigits);

      return total;
    },
    {
      percentage: [] as number[],
      count: [] as number[],
    }
  );
  const numberOfDigitsForCount = Math.max(...digitsAll.count);

  if (!codecStatistics.length) {
    return null;
  }

  return (
    <table className="pure-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Percentage</th>
          <th>Count</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        {codecStatistics.map(([name, percentage, count]) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{percentage.toFixed(2)}%</td>
            <td>{String(count).padStart(numberOfDigitsForCount, '0')}</td>
            <td>
              <span
                style={{
                  display: 'inline-block',
                  width: '1ch',
                  height: '1ch',
                  background: `${colourCodecMap[name]}`,
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Statistics;
