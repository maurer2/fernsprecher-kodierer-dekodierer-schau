export type Codec = string | null;

export type StatisticsAbsolute = Record<Extract<Codec, string>, number>;

export type StatisticsRelative = [codecName:  Extract<Codec, string>, percentage: number][];
