import { ReactElement, useEffect, VFC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useCallListGroupedByDate from '../../hooks/useCallListGroupedByDate';
import Call from '../Call/Call';

import * as Types from './CallList.types';

const CallList: VFC<Readonly<Types.CallListProps>> = ({ calls }): ReactElement => {
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

  return (
    <div className="container">
      <Call calls={calls}/>
    </div>
  );
};

export default CallList;
