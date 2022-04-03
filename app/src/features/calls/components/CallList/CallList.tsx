import { ReactElement, VFC, useMemo } from 'react';
import useCallListGroupedByDate from '../../hooks/useCallListGroupedByDate';
import Day from '../Day';

import * as Types from './CallList.types';

const CallList: VFC<Readonly<Types.CallListProps>> = ({ calls, currentDay }): ReactElement | null => {
  const [groupedCallList] = useCallListGroupedByDate(calls);
  const callsForCurrentDay = useMemo(() => {
    if (!currentDay) {
      return [];
    }
    return groupedCallList[currentDay] ?? [];
  }, [groupedCallList, currentDay]);

  return (
    <div className="container">
      {currentDay ? (
        <Day callsForCurrentDay={callsForCurrentDay} />
      ) : (
        <span>Please select a date</span>
      )}
    </div>
  );
};

export default CallList;
