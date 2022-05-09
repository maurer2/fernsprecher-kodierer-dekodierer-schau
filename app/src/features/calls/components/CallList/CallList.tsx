import { ReactElement, FC, useMemo } from 'react';
import useCallListGroupedByDate from '../../hooks/useCallListGroupedByDate';
import Day from '../Day';

import * as Types from './CallList.types';
import * as Styles from './CallList.styles';

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
    <Styles.CallListWrapper>
      {currentDay ? <Day callsForCurrentDay={callsForCurrentDay} /> : <h3>Please select a date</h3>}
    </Styles.CallListWrapper>
  );
};

export default CallList;
