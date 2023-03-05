import { promises as fs2 } from 'node:fs';

import { CallListSchemaStringified, CallListSchema } from '../types/scraper';

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

    const dateTimeTextWithoutCallDuration =
      dateTime
        ?.split('.')
        ?.join('/')
        ?.split(/\u00A0/g)[0]
        .trim() ?? null;

    // typescript expects same or narrower type as parameter for includes, not the wider
    const codecSend =
      send !== null &&
      Boolean(send.length) &&
      (supportedCodecs as ReadonlyArray<string>).includes(send)
        ? (send as typeof supportedCodecs[number])
        : null;
    // typescript expects same or narrower type as parameter for includes, not the wider
    const codecReceive =
      receive !== null &&
      Boolean(receive.length) &&
      (supportedCodecs as ReadonlyArray<string>).includes(receive)
        ? (send as typeof supportedCodecs[number])
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
