import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { CallListSchemaStringified, CallListSchema } from '../types/scraper';

dayjs.extend(customParseFormat);

export default async function parseScrapedData(
  pageData: CallListSchemaStringified
): Promise<CallListSchema | Error> {
  const supportedCodecs = [
    'G.711',
    'G.722-HD',
    'G.726',
    'G.729',
  ] as const satisfies readonly string[];

  const dateTimeCodecsList: CallListSchema = pageData.flatMap((entry) => {
    const { dateTime, codecs } = entry;
    const { send, receive } = codecs;

    const parsedDateTimeTextWithoutCallDuration = dayjs(dateTime, 'DD.MM.YYYY H:mm');
    const dateTimeTextWithoutCallDuration = parsedDateTimeTextWithoutCallDuration.isValid()
      ? parsedDateTimeTextWithoutCallDuration.toISOString()
      : null;

    // typescript expects same or narrower type as parameter for includes, not the wider
    const codecSend =
      send !== null &&
      Boolean(send.length) &&
      (supportedCodecs as ReadonlyArray<string>).includes(send)
        ? (send?.split(', ') as Array<typeof supportedCodecs[number]> ?? null)
        : null;
    // typescript expects same or narrower type as parameter for includes, not the wider
    const codecReceive =
      receive !== null &&
      Boolean(receive.length) &&
      (supportedCodecs as ReadonlyArray<string>).includes(receive)
        ? (send?.split(', ') as Array<typeof supportedCodecs[number]> ?? null)
        : null;

    return [
      {
        dateTime: dateTimeTextWithoutCallDuration,
        codecs: {
          send: codecSend,
          receive: codecReceive,
        },
      },
    ];
  });

  return dateTimeCodecsList;
}
