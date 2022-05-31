import { useState, useEffect, useRef } from 'react';
import type { CallMap, Call } from '../../store/calls.types';

import * as Types from './useGetCallsForDay.types';

export default function useCallsForDay({
  calls,
  currentDay,
}: Types.PropsUseGetCallsForDay): [Call[]] {
  const [callsForDay, setCallsForDay] = useState<Call[]>([]);
  // const callListPrev = useRef<CallMap | null>(null);

  useEffect(() => {
    if (!currentDay) {
      setCallsForDay([]);
      return;
    }

    const newCallsForDay = calls?.[currentDay]?.entries ?? [];
    setCallsForDay(newCallsForDay);
    // callListPrev.current = calls;
  }, [calls, currentDay]);

  return [callsForDay];
}
