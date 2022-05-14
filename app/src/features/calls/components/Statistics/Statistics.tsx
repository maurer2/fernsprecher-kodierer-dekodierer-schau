import React, { FC, Fragment } from 'react';

import * as Types from './Statistics.types';
import * as Styles from './Statistics.styles';

import { colourCodecMap } from '../PieChart/constants';

const Statistics: FC<Readonly<Types.StatisticsProps>> = ({ codecStatistics }) => {
  const numberOfDigits = codecStatistics.reduce(
    (total, current) => {
      const countDigits = current[2].toString().length;
      total.count = total.count.concat(countDigits);
      return total;
    },
    {
      percentage: [] as number[],
      count: [] as number[],
    },
  );
  const numberOfEntriesTotal = codecStatistics.reduce((total, current) => (total + current[2]), 0);
  const numberOfDigitsForCount = Math.max(...numberOfDigits.count);

  if (!codecStatistics.length) {
    return null;
  }

  return (
    <Styles.StatisticsTable>
      <Styles.IgnoredTableElement as="thead">
        <Styles.IgnoredTableElement as="tr">
          <th>Name</th>
          <th>Percentage</th>
          <th>Count</th>
          <th>Color</th>
        </Styles.IgnoredTableElement>
      </Styles.IgnoredTableElement>
      <Styles.IgnoredTableElement as="tbody">
        {codecStatistics.map(([name, percentage, count]) => (
          <Fragment key={name}>
            <Styles.IgnoredTableElement as="tr">
              <td>{name}</td>
              <td>
                {percentage.toFixed(2)}
                %
              </td>
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
            </Styles.IgnoredTableElement>
          </Fragment>
        ))}
      </Styles.IgnoredTableElement>
      <Styles.IgnoredTableElement as="tfoot">
        <Styles.IgnoredTableElement as="tr">
          <td colSpan={2}>Total</td>
          <td colSpan={1}>{numberOfEntriesTotal}</td>
        </Styles.IgnoredTableElement>
      </Styles.IgnoredTableElement>
    </Styles.StatisticsTable>
  );
};

export default Statistics;
