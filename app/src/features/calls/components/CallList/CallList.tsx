import { Fragment, ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Call } from '../../callsApi';
import useCallListGroupedByDate from '../../hooks/useCallListGroupedByDate';

type CallListProps = {
  calls: Call[];
  sendStatistics: [
    string,
    {
      count: string;
      percentage: number;
    }
  ][];
};

export default function CallList(props: CallListProps): ReactElement {
  const [groupedCallList] = useCallListGroupedByDate(props.calls);
  const { day } = useParams();

  console.log(day);

  useEffect(() => {
    console.log('mounted', props);
  }, [props]);

  return (
    <div className="container">
      <h2>{day}</h2>
      <div>
        <h2>Send Codecs distribution:</h2>
        <dl>
          {props.sendStatistics.map(([key, value]) => (
            <Fragment key={key}>
              <dt>{key}:</dt>
              <dt>{value.percentage.toFixed(2)}%</dt>
            </Fragment>
          ))}
        </dl>
      </div>
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
