import { Fragment, ReactElement, useEffect, useMemo, VFC } from 'react';
import { useParams } from 'react-router-dom';
import useCallListGroupedByDate from '../../hooks/useCallListGroupedByDate';

import * as Types from './Call.types'

const Call: VFC<Readonly<Types.CallProps>> = ({calls}) => {
  const [groupedCallList] = useCallListGroupedByDate(calls);
  const { day } = useParams();

  if (!day) {
    return null
  }

  const dayFormatted = day.replaceAll('-', '/')
  const entriesForDay = groupedCallList[dayFormatted];

  return (
    <div className="container">
      <h2>Send Codecs statistics:</h2>
      {/* <dl>
        {sendStatistics.map(([key, value]) => (
          <Fragment key={key}>
            <dt>{key}:</dt>
            <dt>{value.percentage.toFixed(2)}%</dt>
          </Fragment>
        ))}
      </dl> */}
      <div>
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
