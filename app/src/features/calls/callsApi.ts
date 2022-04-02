import callJSON from '../../data/dummy.json';
import type {Call, CallStringlyTyped} from './Calls.types'
import {isCodec} from './Calls.types'

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
          send: isCodec(send) ? send : 'Unknown',
          receive: isCodec(receive) ? receive : 'Unknown',
        },
      };
    });

    setTimeout(() => resolve(callList), 2500);
  });
}
