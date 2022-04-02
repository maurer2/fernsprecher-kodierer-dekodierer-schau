import {Codec} from '../../Calls.types'

export type StatisticsAbsolute = Record<Codec, number>;

export type CodecsStatistics = [
  name: Codec,
  percentage: number,
  count: number
][];
