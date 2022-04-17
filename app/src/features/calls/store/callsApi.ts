import callJSON from '../../../data/dummy.json';
import type {
  Call, CallStringlyTyped, ISODate, GBDate,
} from './calls.types';
import { isCodec, codecsValuesDefault } from './calls.types';

export function getCallList(): Promise<Call[]> {
  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  return new Promise((resolve) => {
    const callListRaw: CallStringlyTyped[] = callJSON;

    const callList: Call[] = callListRaw.map((call) => {
      const { dateTime, codecs } = call;
      const { send, receive } = codecs;
      const dateTimeParsed = Date.parse(dateTime);

      const { 0: day, 2: month, 4: year } = dateFormatter.formatToParts(dateTimeParsed);
      const isoDate: ISODate | string = `${year.value}-${month.value}-${day.value}`; // todo
      const userDate: GBDate | string = `${day.value}/${month.value}/${year.value}`; // todo

      return {
        dateTime: dateTimeParsed,
        dates: {
          iso: isoDate,
          user: userDate,
        },
        codecs: {
          send: isCodec(send) ? send : codecsValuesDefault,
          receive: isCodec(receive) ? receive : codecsValuesDefault,
        },
      };
    });

    setTimeout(() => resolve(callList), 2000);
  });
}
