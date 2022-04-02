import { useState, useEffect } from 'react';
import type { Call } from '../store/calls.types';
import { groupBy } from 'lodash-es';

type CallListOrderedByDate = Record<string, Call[]>;
export default function useCallListGroupedByDate(callList: Call[]): readonly [CallListOrderedByDate] {
  const [callsOrdered, setIsOnline] = useState<CallListOrderedByDate>({});

  useEffect(() => {
    const callsGroupedByDate = groupBy(callList, (call) => call.dates.user);

    setIsOnline(callsGroupedByDate);
  }, [callList]);

  return [callsOrdered] as const;
}
