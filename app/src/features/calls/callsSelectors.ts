import { RootState } from '../../app/store';

const getReceivingCalls = (state: RootState) =>
  state.calls.callList.flatMap((call) => {
    const { receive } = call.codecs;

    return receive !== null ? receive : [];
  });

const getSendingCalls = (state: RootState) =>
  state.calls.callList.flatMap((call) => {
    const { send } = call.codecs;

    return send !== null ? send : [];
  });

const getCallsUnsorted = (state: RootState) => state.calls.callList.map((call) => call);

const getCallsOrderedByDate = (state: RootState) =>
  state.calls.callList.map((call) => {
    return call;
  });

const getSendCodecsQuantities = (state: RootState) => {
  const codecsBag = getReceivingCalls(state);

  const codecsTally = codecsBag.reduce((total, current) => {
    if (current in total) {
      total[current] += 1;
    } else {
      total[current] = 0;
    }

    return total;
  }, {} as Record<string, number>);

  const codecsTotal = Object.entries(codecsTally).reduce((total, current) => total + current[1], 0);

  const codecsWithQuantities = Object.entries(codecsTally).map((codec) => {
    const [key, count] = codec;
    const percentage = (count * 100) / codecsTotal;

    return [
      [key],
      {
        count,
        percentage,
      },
    ];
  });

  const codecs: Record<string, { count: string; percentage: number }> =
    Object.fromEntries(codecsWithQuantities);

  return codecs;
};

const getDaysWithCalls = (state: RootState) => {
  const callsSortedByDate = [...state.calls.callList].sort(
    (callA, callB) => callA.dateTime - callB.dateTime
  );

  const daysBag = callsSortedByDate.map(({ dateTime }) => {
    const dateFormatted = new Intl.DateTimeFormat('en-GB').format(dateTime);

    return dateFormatted;
  });

  const daysSet = [...new Set(daysBag)];

  return daysSet;
};

export { getCallsUnsorted, getCallsOrderedByDate, getSendCodecsQuantities, getDaysWithCalls };
