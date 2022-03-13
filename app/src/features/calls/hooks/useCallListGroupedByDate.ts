import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Call } from '../callsApi';
import { groupBy } from 'lodash-es';

// type CallListOrderedByDate = Record<string, Call['codecs']>;

export default function useCallListGroupedByDate(callList: Call[]) {
  const [callsOrdered, setIsOnline] = useState({});

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

    // console.log('groupedByDateObject', callsGroupedByDate);

    setIsOnline(callsGroupedByDate);
  }, [callList, getDateFormattedForSorting]);

  return [callsOrdered];
}
