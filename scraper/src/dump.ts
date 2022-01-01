import { promises as fs2 } from 'node:fs';

const filePath = 'dist/json';

export default async function dumpJSON(payload: unknown, fileName: string): Promise<void | Error> {
  try {
    await fs2.mkdir(filePath, { recursive: true });

    let payloadStringified: ReturnType<JSON['stringify']> = '';

    if (typeof payload !== 'string') {
      payloadStringified = JSON.stringify(payload, null, 4);
    }

    return await fs2.writeFile(`${filePath}/${fileName}`, payloadStringified, { flag: 'w' });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
