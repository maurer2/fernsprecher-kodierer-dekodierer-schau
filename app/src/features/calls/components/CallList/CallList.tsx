import { ReactElement, useEffect, VFC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useCallListGroupedByDate from '../../hooks/useCallListGroupedByDate';
import Call from '../Call/Call';

import * as Types from './CallList.types';

const CallList: VFC<Readonly<Types.CallListProps>> = ({ calls, sendStatistics }): ReactElement => {
  const [groupedCallList] = useCallListGroupedByDate(calls);
  const { day } = useParams();

  function goPrev(): void {}

  function goNext(): void {}

  const numberOfEntries: number = useMemo(() => {
    const count = Object.values(groupedCallList)
      .map((groupEntries) => groupEntries.length)
      .reduce((total, current) => (total += current), 0);

    return count
  }, [groupedCallList]);

  useEffect(() => {
    console.log('mounted');
  }, [calls]);

  return (
    <div className="container">
      <h1>{day}</h1>
      <span>{numberOfEntries} entries</span>
      <Call calls={calls} sendStatistics={sendStatistics} />
    </div>
  );
};

export default CallList;
