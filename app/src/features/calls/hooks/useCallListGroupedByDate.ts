import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Call } from '../callsApi';
import { groupBy } from 'lodash-es';

type CallListOrderedByDate = Record<ReturnType<Intl.DateTimeFormat['format']>, Call[]>;

export default function useCallListGroupedByDate(callList: Call[]): readonly [CallListOrderedByDate] {
  const [callsOrdered, setIsOnline] = useState<CallListOrderedByDate>({});

  const formatter = useMemo(() => new Intl.DateTimeFormat('en-GB', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }),[]);

  const getDateFormattedForSorting = useCallback((dateTime: ReturnType<typeof Date['now']>) => {
    const dateTimeFormatted = formatter.format(dateTime);

    return dateTimeFormatted;
  }, [formatter])

  useEffect(() => {
    const callsGroupedByDate = groupBy(callList, (call) => getDateFormattedForSorting(call.dateTime));

    setIsOnline(callsGroupedByDate);
  }, [callList, getDateFormattedForSorting]);

  return [callsOrdered] as const;
}
