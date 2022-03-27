import callJSON from '../../data/dummy.json';

const codecsValues = ['G.711', 'G.722', 'G.726', 'G.729'] as const;
type Codec = typeof codecsValues[number];

// Codec type guard
function isCodec(codecString: string | null): codecString is Codec {
  if (!codecString) {
    return false;
  }

  return codecsValues.includes(codecString as Codec);
}

type CallStringlyTyped = {
  dateTime: string;
  codecs: {
    send: string | null;
    receive: string | null;
  };
};

// export type Call = Omit<CallStringlyTyped, 'codecs'> & {
export type Call = {
  dateTime: ReturnType<typeof Date['now']>;
  codecs: {
    send: Codec | null;
    receive: Codec | null;
  };
};

export function getEntry(): Promise<ReturnType<typeof Date['now']>> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Date.now()), 1000);
  });
}

export function getCallList(): Promise<Call[]> {
  return new Promise((resolve) => {
    const callListRaw: CallStringlyTyped[] = callJSON;

    const callList: Call[] = callListRaw.map((call) => {
      const { dateTime, codecs } = call;
      const { send, receive } = codecs;
      const dateTimeParsed = Date.parse(dateTime);

      return {
        dateTime: dateTimeParsed,
        codecs: {
          send: isCodec(send) ? send : null,
          receive: isCodec(receive) ? receive : null,
        },
      };
    });

    setTimeout(() => resolve(callList), 2250);
  });
}
