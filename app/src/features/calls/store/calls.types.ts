export const codecsValues = ['G.711', 'G.722', 'G.726', 'G.729', 'Unknown'] as const;
export const codecsValuesDefault = codecsValues[4];
export type Codec = typeof codecsValues[number];

// Codec type guard
export function isCodec(codecString: string | null): codecString is Codec {
  if (!codecString) {
    return false;
  }
  return codecsValues.includes(codecString as Codec);
}

type DateTimeStamp = ReturnType<typeof Date['now']>;
export type ISODate = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
export type GBDate = `${number}${number}/${number}${number}/${number}${number}${number}${number}`;

export type CallStringlyTyped = {
  dateTime: string;
  codecs: {
    send: string | null;
    receive: string | null;
  };
};

export type Call = {
  dateTime: DateTimeStamp;
  dates: {
    iso: ISODate | string,
    user: GBDate | string,
  },
  codecs: {
    send: Codec;
    receive: Codec;
  };
};

export type CallsSliceState = {
  callList: Call[];
  isLoading: boolean;
  hasRedirectedToLatestCall: boolean;
};

export type CodecCount = Record<Codec, number>;

export type CodecQuantities = Record<Codec, { count: number; percentage: number }>;
