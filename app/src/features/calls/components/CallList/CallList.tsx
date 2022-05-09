import { ReactElement, FC, useMemo } from 'react';
import useCallListGroupedByDate from '../../hooks/useCallListGroupedByDate';
import Day from '../Day';

import * as Types from './CallList.types';

const CallList: FC<Readonly<Types.CallListProps>> = ({
  calls,
  currentDay,
}): ReactElement | null => {
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
        <h2>Please select a date</h2>
      )}
    </div>
  );
};

export default CallList;
