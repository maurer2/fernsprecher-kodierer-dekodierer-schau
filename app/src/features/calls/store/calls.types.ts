export const codecsValues = {
  'G.711': 'G711',
  'G.722': 'G722',
  'G.726': 'G726',
  'G.729': 'G729',
  Unknown: 'Unknown',
} as const;
export const codecsValuesDefault = (
  Object.keys(codecsValues) as Array<keyof typeof codecsValues>
)[4];

export type Codec = keyof typeof codecsValues;

// Codec type guard
export function isCodec(codecString: string | null): codecString is Codec {
  if (!codecString) {
    return false;
  }
  const codecNames = Object.keys(codecsValues) as Array<keyof typeof codecsValues>;

  return codecNames.includes(codecString as Codec);
}

export type CallStringlyTyped = {
  dateTime: string;
  codecs: {
    send: string | null;
    receive: string | null;
  };
};

export type DateTimeStamp = ReturnType<typeof Date['now']>;

export type CallDate = {
  iso: string;
  user: string;
};

export type Call = {
  dateTime: DateTimeStamp;
  dates: CallDate;
  codecs: {
    send: Codec;
    receive: Codec;
  };
};

export type Day = Call['dates']['iso'];

export type CallMap = Record<Day, {
  dayDates: CallDate, // todo remove individual iso and user date from entries
  entries: Call[],
}>;

export type CallsSliceState = {
  isLoading: boolean;
  callList: CallMap | null;
  mostRecentDay: CallDate | null;
  currentDate: CallDate | null;
};

export type CodecCount = Record<Codec, number>;

export type CodecQuantities = Record<Codec, {
  count: number;
  percentage: number
}>;
