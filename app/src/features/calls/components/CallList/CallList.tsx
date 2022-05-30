import {
  ReactElement, FC, useEffect, useState,
} from 'react';
// import useGetCallsForDay from '../../hooks/useCallsForDay';
import { Call } from '../../store/calls.types';
import Day from '../Day';

import * as Types from './CallList.types';
import * as Styles from './CallList.styles';

const CallList: FC<Readonly<Types.CallListProps>> = ({
  callList,
  currentDay,
}): ReactElement | null => {
  /* Workaround eslint */
  const [callsForCurrentDay, setCallsForCurrentDay] = useState<Call[]>([]);

  useEffect(() => {
    // only update callsOrdered if entries of callList have changed
    if (!currentDay) {
      setCallsForCurrentDay([]);
      return;
    }

    const newCallsForDay = callList?.[currentDay]?.entries ?? [];
    setCallsForCurrentDay(newCallsForDay);
    // callListPrev.current = calls;
  }, [callList, currentDay]);

  // const [callsForCurrentDay] = useGetCallsForDay(calls, currentDay);

  return (
    <Styles.CallList>
      {currentDay ? <Day callsForCurrentDay={callsForCurrentDay} /> : null}
    </Styles.CallList>
  );
};

export default CallList;
