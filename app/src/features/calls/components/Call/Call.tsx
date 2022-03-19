import React, { Fragment, VFC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useCallListGroupedByDate from '../../hooks/useCallListGroupedByDate';
import useCallStatistics from '../../hooks/useCallStatistics/useCallStatistics';

import * as Types from './Call.types'

const Call: VFC<Readonly<Types.CallProps>> = ({calls}) => {
  const { day = '' } = useParams();
  const dayFormatted = day.replaceAll('-', '/')

  const [groupedCallList] = useCallListGroupedByDate(calls);
  const entriesForDay = useMemo(() => groupedCallList[dayFormatted] ?? [], [dayFormatted, groupedCallList]);
  const receiveCodecs = useMemo(() => entriesForDay.map((entry => entry.codecs.receive)), [entriesForDay]);

  const [numberOfCodecs, _, codecStatisticRelative] = useCallStatistics(receiveCodecs)


  return (
    <div className="container">
      <h2>Codecs statistics:</h2>
      <dl>
        {codecStatisticRelative.map(([key, value]) => (
          <Fragment key={key}>
            <dt>{key}:</dt>
            <dt>{value.toFixed(2)}%</dt>
          </Fragment>
        ))}
      </dl>
      <div>
        <h2>{numberOfCodecs} entries for the day</h2>
        <code>
          {Boolean(entriesForDay) && entriesForDay.map((group, index) => (
            <Fragment key={index}>
              <pre>{JSON.stringify(group, null, 4)}</pre>
            </Fragment>
          ))}
        </code>
      </div>
    </div>
  );
}

export default Call;
