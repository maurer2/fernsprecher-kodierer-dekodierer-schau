import React, { Fragment, VFC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useCallListGroupedByDate from '../../hooks/useCallListGroupedByDate';
import useCallStatistics from '../../hooks/useCallStatistics/useCallStatistics';

import PieChart from '../PieChart';

import * as Types from './Call.types';

const Call: VFC<Readonly<Types.CallProps>> = ({ calls }) => {
  const colours = ['red', 'green', 'blue', 'yellow', 'orange', 'deeppink'];
  const { day = '' } = useParams();
  const dayFormatted = day.replaceAll('-', '/');

  const [groupedCallList] = useCallListGroupedByDate(calls);
  const entriesForDay = useMemo(
    () => groupedCallList[dayFormatted] ?? [],
    [dayFormatted, groupedCallList]
  );
  const receiveCodecs = useMemo(
    () => entriesForDay.map((entry) => entry.codecs.receive),
    [entriesForDay]
  );

  const [numberOfCodecs, codecsStatistics] = useCallStatistics(receiveCodecs);


  return (
    <div className="container">
      <h2>Codecs statistics</h2>
      <dl>
        {codecsStatistics.map(([key, percentage, count], index) => (
          <Fragment key={key}>
            <dt>{key}:</dt>
            <dd>
              {percentage.toFixed(2)}%
            </dd>
            <dd>
              {count}
            </dd>
            <dd>
              <span
                style={{
                  display: 'inline-block',
                  width: '1ch',
                  height: '1ch',
                  background: `${colours[index]}`,
                }}
              />
            </dd>
          </Fragment>
        ))}
      </dl>
      <h2>Pie chart</h2>
      <PieChart numberOfCodecs={numberOfCodecs} codecStatistics={codecsStatistics} />
      <h2>{numberOfCodecs} entries for the day</h2>
      <code>
        {Boolean(entriesForDay) &&
          entriesForDay.map((group, index) => (
            <Fragment key={index}>
              <pre>{JSON.stringify(group, null, 4)}</pre>
            </Fragment>
          ))}
      </code>
    </div>
  );
};

export default Call;
