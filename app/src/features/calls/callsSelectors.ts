import { RootState } from '../../app/store';

const getReceivingCalls = (state: RootState) => {
  return state.calls.callList.flatMap((call) => {
    const { receive } = call.codecs;

    return receive !== null ? receive : [];
  });
}

const getCallsUnsorted = (state: RootState) => state.calls.callList.map((call) => call);

const getCallsOrderedByDate = (state: RootState) =>
  state.calls.callList.map((call) => {
    return call;
  });

const getSendCodecs = (state: RootState) => {
  return state.calls.callList
}

const getSendCodecsQuantities = (state: RootState) => {
  const codecsBag = getReceivingCalls(state);

  const codecsTally = codecsBag.reduce((total: Record<string, number>, current) => {
    if (current in total) {
      total[current] += 1;
    } else {
      total[current] = 0;
    }

    return total;
  }, {});

  const codecsTotal = Object.entries(codecsTally).reduce((total, current) => total + current[1], 0);

  const codecsWithQuantities = Object.entries(codecsTally).map((codec) => {
    const [key, count] = codec;
    const percentage = (codecsTotal === 0) ? 0 : (count * 100) / codecsTotal;

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

const getDaysWithCalls = (state: RootState): string[] => {
  const dateTimeFormatter = new Intl.DateTimeFormat('en-GB');

  const daysBag = state.calls.callList.map(({ dateTime }) => {
    const dateFormatted =
      dateTimeFormatter.format(dateTime)
      .replaceAll('/', '-'); // todo use DateTimeFormatPartTypes instead

    return dateFormatted;
  });

  const daysSet = [...new Set(daysBag)];

  return daysSet;
};

export { getCallsUnsorted, getCallsOrderedByDate, getSendCodecs, getSendCodecsQuantities, getDaysWithCalls };
