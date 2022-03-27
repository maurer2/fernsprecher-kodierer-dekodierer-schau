import React, { VFC, Fragment } from 'react';

import * as Types from './Statistics.types';
import { colourCodecMap } from '../PieChart/constants';

const Statistics: VFC<Readonly<Types.StatisticsProps>> = ({ codecStatistics }) => {
  return (
    <dl>
      {codecStatistics.map(([name, percentage, count]) => (
        <Fragment key={name}>
          <dt>{name}:</dt>
          <dd>{percentage.toFixed(2)}%</dd>
          <dd>{count}</dd>
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
