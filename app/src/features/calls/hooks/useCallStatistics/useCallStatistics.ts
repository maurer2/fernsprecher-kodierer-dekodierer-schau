import type { Codec, StatisticsAbsolute, StatisticsRelative } from './useCallStatistics.types';

export default function useCallStatistics(
  codecs: Codec[]
): readonly [number, StatisticsAbsolute, StatisticsRelative] {
  const codecsAbsoluteUnsorted = codecs.reduce(
    (total: StatisticsAbsolute, current) => {
      if (current === null) {
        total['Unknown'] += 1;
        return total;
      }

      total[current] = current in total ? (total[current] += 1) : (total[current] = 0);

      return total;
    },
    {
      Unknown: 0,
    }
  );

  const codecsAbsolute = Object.entries(codecsAbsoluteUnsorted).sort(
    (codecA, codecB) => codecB[1] - codecA[1]
  );

  const codecsTotal = codecsAbsolute.reduce((total, [, count]) => total + count, 0);
  const codecsRelative: StatisticsRelative = codecsAbsolute.map((codec) => {
    const [key, count] = codec;
    const percentage = codecsTotal === 0 ? 0 : (count * 100) / codecsTotal;

    return [key, percentage];
  });

  return [codecsTotal, codecsAbsoluteUnsorted, codecsRelative] as const;
}
