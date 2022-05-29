import { useState, useEffect, useRef } from 'react';
import { groupBy, isEqual } from 'lodash-es';
import type { Call, CallMap } from '../../store/calls.types';
import type { CallListOrderedByDate } from './useCallListGroupedByDate.types';

export default function useCallsGroupedByDate(calls: CallMap): readonly [CallListOrderedByDate] {
  const [callsOrdered, setCallsOrdered] = useState<CallListOrderedByDate>({});
  const callListPrev = useRef<CallMap | null>(null);

  useEffect(() => {
    // only update callsOrdered if entries of callList have changed
    if (isEqual(callListPrev.current, calls)) {
      return;
    }

    const callsGroupedByDate = groupBy(calls, 'dates.iso');
    setCallsOrdered(callsGroupedByDate);
    callListPrev.current = calls;
  }, [calls]);

  return [callsOrdered] as const;
}
