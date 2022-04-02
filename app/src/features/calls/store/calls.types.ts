export const codecsValues = ['G.711', 'G.722', 'G.726', 'G.729', 'Unknown'] as const;
export type Codec = typeof codecsValues[number];

// Codec type guard
export function isCodec(codecString: string | null): codecString is Codec {
  if (!codecString) {
    return false;
  }
  return codecsValues.includes(codecString as Codec);
}

export type CallStringlyTyped = {
  dateTime: string;
  codecs: {
    send: string | null;
    receive: string | null;
  };
};

export type Call = {
  dateTime: ReturnType<typeof Date['now']>;
  codecs: {
    send: Codec;
    receive: Codec;
  };
};

export type CallsSliceState = {
  callList: Call[];
  isLoading: boolean;
};
