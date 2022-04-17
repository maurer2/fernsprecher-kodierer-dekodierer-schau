import React, { FC } from 'react';

import * as Types from './Statistics.types';
import { colourCodecMap } from '../PieChart/constants';

const Statistics: FC<Readonly<Types.StatisticsProps>> = ({ codecStatistics }) => {
  const numberOfDigits = codecStatistics.reduce(
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
  const numberOfEntriesTotal = codecStatistics.reduce((total, current) => (total += current[2]), 0);

  const numberOfDigitsForCount = Math.max(...numberOfDigits.count);
  //const numberOfEntriesTotal = Math.max(...codecStatistics);

  if (!codecStatistics.length) {
    return null;
  }

  return (
    <table className="pure-table pure-table-bordered">
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
      <tfoot>
        <tr>
          <td colSpan={2}>Total</td>
          <td colSpan={1}>{numberOfEntriesTotal}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Statistics;
