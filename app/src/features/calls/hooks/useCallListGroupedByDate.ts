import { useState, useEffect } from 'react';
import type { Call } from '../callsApi';
import { groupBy } from 'lodash-es';

type CallListOrderedByDate = Record<string, Call['codecs']>

export default function useCallListGroupedByDate(callList: Call[]): CallListOrderedByDate  {
  const [callsOrdered, setIsOnline] = useState({});

  // console.log('callsOrdered', callsOrdered);

  useEffect(() => {
    const orderedByDateNumerical = groupBy(callList, (call) => call.dateTime)
    const arr = Object.entries(orderedByDateNumerical)

    console.log('callsOrdered', arr);

    setIsOnline(orderedByDateNumerical)
  }, [callList]);

  return callsOrdered;
}
