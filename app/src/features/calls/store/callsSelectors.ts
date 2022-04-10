import { RootState } from '../../../app/store';
import type { Call, Codec, CodecCount, CodecQuantities } from './calls.types';

const getAllCodecs = (state: RootState): Codec[] => {
  return state.calls.callList.flatMap((call) => {
    const { receive, send } = call?.codecs;

    if (!receive && !send) {
      return [];
    }

    return [receive, send];
  });
};

const getCallsUnsorted = (state: RootState): Call[] => state.calls.callList.map((call) => call);

const getCodecsQuantities = (state: RootState) => {
  const codecsBag: Codec[] = getAllCodecs(state);

  const codecsTally = codecsBag.reduce((total, current: Codec) => {
    if (current in total) {
      total[current] += 1;
    } else {
      total[current] = 0;
    }

    return total;
  }, {} as CodecCount);

  const codecsTotal = Object.entries(codecsTally).reduce((total, current) => total + current[1], 0);

  const codecsWithQuantities = Object.entries(codecsTally).map((codec) => {
    const [key, count] = codec;
    const percentage = codecsTotal === 0 ? 0 : (count * 100) / codecsTotal;

    return [
      key,
      {
        count,
        percentage,
      },
    ];
  });

  const codecs: CodecQuantities = Object.fromEntries(codecsWithQuantities);

  return codecs;
};

const getDaysWithCalls = (state: RootState): string[] => {
  const daysBag: string[] = state.calls.callList.map(({ dates }) => dates.iso);
  const daysSet: string[] = [...new Set(daysBag.sort())];

  return daysSet;
};

const getMostRecentDayWithCall = (state: RootState): string | null => {
  const days = getDaysWithCalls(state);
  const lastDay = days.at(-1)

  if (!lastDay) {
    return null;
  }

  return lastDay;
};

export { getCallsUnsorted, getCodecsQuantities, getDaysWithCalls, getMostRecentDayWithCall };
