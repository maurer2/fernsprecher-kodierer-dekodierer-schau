export type Codec = string | null;

export type StatisticsAbsolute = Record<Extract<Codec, string>, number>;

export type CodecsStatistics = [
  codecName: Extract<Codec, string>,
  percentage: number,
  count: number
][];
