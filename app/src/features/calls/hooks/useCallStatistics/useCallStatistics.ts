import type { StatisticsAbsolute, CodecsStatistics } from './useCallStatistics.types';
import { Codec } from '../../store/calls.types';

export default function useCallStatistics(codecs: Codec[]): readonly [number, CodecsStatistics] {
  const emptyCount: StatisticsAbsolute = {
    'G.711': 0,
    'G.722': 0,
    'G.726': 0,
    'G.729': 0,
    'Unknown': 0,
  };

  const codecsAbsoluteUnsorted = codecs.reduce((total, current) => {
    total[current] += 1;

    return total;
  }, emptyCount);

  const codecsAbsoluteSorted = Object.entries(codecsAbsoluteUnsorted).sort(
    (codecA, codecB) => codecB[1] - codecA[1]
  );

  const codecsTotal = codecsAbsoluteSorted.reduce((total, [, count]) => total + count, 0);
  const codecsStatistics: CodecsStatistics = codecsAbsoluteSorted.map((codec) => {
    const [name, count] = codec;
    const percentage = codecsTotal === 0 ? 0 : (count * 100) / codecsTotal;

    return [name as Codec, percentage, count]; // dirty
  });

  return [codecsTotal, codecsStatistics] as const;
}
