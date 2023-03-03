import { z } from 'zod';

export const callSchema = z
  .object({
    // dateTime
    dateTime: z.string().min(1).nullable(),
    // codecs
    codecs: z
      .object({
        send: z.string().nullable(), // todo tuple of codecs "G.711", etc
        receive: z.string().nullable(), // todo tuple of codecs "G.711", etc
      })
      .strict(),
  })
  .strict(); // todo TS type for easier checks

export const callListSchema = z.array(callSchema);// .nonempty();
