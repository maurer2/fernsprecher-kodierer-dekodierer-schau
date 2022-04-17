import { RootState } from '../../../app/store';
import type {
  Call, CallDates, Codec, CodecCount, CodecQuantities,
} from './calls.types';

const getAllCodecs = (state: RootState): Codec[] => state.calls.callList.flatMap((call) => {
  const receive = call?.codecs?.receive;
  const send = call?.codecs?.send;

  if (!receive && !send) {
    return [];
  }

  return [receive, send];
});

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

const getDaysWithCalls = (state: RootState): CallDates[] => {
  const days: CallDates[] = state.calls.callList
    .map(({ dates }) => dates)
    .filter((dates, index, arr) => {
      const firstOccurrenceIndex = arr.findIndex((datesCurrent) => {
        const isMatchingIso = datesCurrent.iso === dates.iso;
        const isMatchingUser = datesCurrent.user === dates.user;

        return isMatchingIso && isMatchingUser;
      });

      return firstOccurrenceIndex === index;
    })
    .sort((a, z) => a.iso.localeCompare(z.iso));

  return days;
};

const getMostRecentDayWithCall = (state: RootState): Call['dates'] | null => {
  const days = getDaysWithCalls(state);

  if (!days || !days.length) {
    return null;
  }
  const lastDay = days.at(-1)!;

  return lastDay;
};

export {
  getCallsUnsorted, getCodecsQuantities, getDaysWithCalls, getMostRecentDayWithCall,
};
