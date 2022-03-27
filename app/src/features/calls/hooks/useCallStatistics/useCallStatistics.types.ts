import {Codec} from '../../callsApi'

export type StatisticsAbsolute = Record<Codec, number>;

export type CodecsStatistics = [
  name: Codec,
  percentage: number,
  count: number
][];
