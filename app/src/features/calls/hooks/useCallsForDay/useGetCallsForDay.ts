import { useState, useEffect } from 'react';
import type { Call } from '../../store/calls.types';

import * as Types from './useGetCallsForDay.types';

export default function useCallsForDay({
  callList,
  currentDay,
}: Types.PropsUseGetCallsForDay): [Call[]] {
  const [callsForDay, setCallsForDay] = useState<Call[]>([]);

  useEffect(() => {
    if (!currentDay) {
      setCallsForDay([]);
      return;
    }

    const newCallsForDay = callList?.[currentDay]?.entries ?? [];
    setCallsForDay(newCallsForDay);
  }, [callList, currentDay]);

  return [callsForDay];
}
