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

type DateTimeStamp = ReturnType<typeof Date['now']>;

export type CallStringlyTyped = {
  dateTime: string;
  codecs: {
    send: string | null;
    receive: string | null;
  };
};

export type CallDates = {
  iso: string;
  user: string;
};

export type Call = {
  dateTime: DateTimeStamp;
  dates: CallDates;
  codecs: {
    send: Codec;
    receive: Codec;
  };
};

export type CallMap = Record<string, Call>;

export type CallsSliceState = {
  callList: Call[];
  callList2: CallMap | null;
  mostRecentDay: CallDates | null;
  isLoading: boolean;
  hasRedirectedToLatestCall: boolean;
  currentDate: CallDates | null;
};

export type CodecCount = Record<Codec, number>;

export type CodecQuantities = Record<Codec, { count: number; percentage: number }>;
