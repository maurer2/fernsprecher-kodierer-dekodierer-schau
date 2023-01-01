import callJSON from '../../../data/dummy.json';
import type {
  CallStringlyTyped, CallWithDates,
} from './calls.types';
import { isCodec, codecDefault } from './calls.types';

export function getCallList(): Promise<CallWithDates[]> {
  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  return new Promise((resolve) => {
    const callListRaw: CallStringlyTyped[] = callJSON;

    const callList: CallWithDates[] = callListRaw.map((call) => {
      const { dateTime, codecs } = call;
      const { send, receive } = codecs;
      const dateTimeParsed = Date.parse(dateTime);

      const { 0: day, 2: month, 4: year } = dateFormatter.formatToParts(dateTimeParsed);
      const isoDate = `${year.value}-${month.value}-${day.value}`;
      const userDate = `${day.value}/${month.value}/${year.value}`;

      return {
        dateTime: dateTimeParsed,
        dates: {
          iso: isoDate,
          user: userDate,
        },
        codecs: {
          send: isCodec(send) ? send : codecDefault,
          receive: isCodec(receive) ? receive : codecDefault,
        },
      };
    });

    setTimeout(() => resolve(callList), 1000);
  });
}
