import callJSON from '../../data/dummy.json';

type CallStringlyTyped = {
  dateTime: string;
  codecs: {
    send: string | null;
    receive: string | null;
  };
};

export type Call = Omit<CallStringlyTyped, 'dateTime'> & {
  dateTime: ReturnType<typeof Date['now']>;
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
      const { dateTime } = call;
      const dateTimeParsed = Date.parse(dateTime);

      return {
        ...call,
        dateTime: dateTimeParsed,
      };
    });

    setTimeout(() => resolve(callList), 1000);
  });
}
