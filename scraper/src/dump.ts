import { promises as fs2 } from 'node:fs';

import { callListSchema } from '../schema/callList';
import { CallListSchema } from '../types/scraper';

const filePath = 'dist/json';

export default async function dumpJSON(
  payload: CallListSchema,
  fileName: string
): Promise<string | Error> {
  if (!callListSchema.safeParse(payload).success) {
    console.log(callListSchema.safeParse(payload));
    throw new Error('invalid format for scraped values');
  }
  console.log('payload validation successful');

  try {
    let payloadStringified = JSON.stringify(payload, null, 4);

    await fs2.mkdir(filePath, { recursive: true });
    await fs2.writeFile(`${filePath}/${fileName}`, payloadStringified, { flag: 'w' });
    console.log(`${payload.length} entries written to ${fileName}`);

    return payloadStringified;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('An error has occurred');
  }
}
