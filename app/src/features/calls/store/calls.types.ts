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
export type Day = CallDate['iso'];

export type Call = {
  dateTime: DateTimeStamp;
  codecs: {
    send: Codec;
    receive: Codec;
  };
};
export type CallWithDates = Call & {
  dates: CallDate;
};

export type CallMapGeneric<T> = Record<Day, {
  dayDates: CallDate,
  entries: T[],
}>;
export type CallMap = CallMapGeneric<Call>;
export type CallWithDatesMap = CallMapGeneric<CallWithDates>;

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
