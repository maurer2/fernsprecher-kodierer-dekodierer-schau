import { useState, useEffect, useRef } from 'react';
import { groupBy, isEqual } from 'lodash-es';
import type { Call } from '../../store/calls.types';
import type { CallListOrderedByDate } from './useCallListGroupedByDate.types';

export default function useCallListGroupedByDate(
  callList: Call[],
): readonly [CallListOrderedByDate] {
  const [callsOrdered, setCallsOrdered] = useState<CallListOrderedByDate>({});
  const callListPrev = useRef<Call[] | null>(null);

  useEffect(() => {
    // only update callsOrdered if entries of callList have changed
    if (isEqual(callListPrev.current, callList)) {
      return;
    }

    const callsGroupedByDate = groupBy(callList, (call) => call.dates.iso);
    setCallsOrdered(callsGroupedByDate);
    callListPrev.current = callList;
  }, [callList]);

  return [callsOrdered] as const;
}
