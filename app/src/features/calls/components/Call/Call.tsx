import { Fragment, ReactElement, useEffect, VFC } from 'react';
import { useParams } from 'react-router-dom';
import useCallListGroupedByDate from '../../hooks/useCallListGroupedByDate';

import * as Types from './Call.types'

const Call: VFC<Readonly<Types.CallProps>> = ({calls, sendStatistics}): ReactElement => {
  const [groupedCallList] = useCallListGroupedByDate(calls);
  const { day } = useParams();

  console.log(day);

  useEffect(() => {
    console.log('mounted', calls);
  }, [calls]);

  return (
    <div className="container">
      <h2>Send Codecs statistics:</h2>
      <dl>
        {sendStatistics.map(([key, value]) => (
          <Fragment key={key}>
            <dt>{key}:</dt>
            <dt>{value.percentage.toFixed(2)}%</dt>
          </Fragment>
        ))}
      </dl>
      <div>
        <code>
          {Object.entries(groupedCallList).map((group) => (
            <Fragment key={group[0]}>
              <h3>
                {group[0]} {group[1].length}
              </h3>
              <pre>{JSON.stringify(group[1], null, 4)}</pre>
            </Fragment>
          ))}
        </code>
      </div>
    </div>
  );
}

export default Call;
