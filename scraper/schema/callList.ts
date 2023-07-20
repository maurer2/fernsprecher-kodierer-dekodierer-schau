import { z } from 'zod';

export const callSchema = z
  .object({
    // dateTime
    dateTime: z.string().datetime().nullable(),
    // codecs
    codecs: z
      .object({
        send: z.union([
          z.literal('G.711'),
          z.literal('G.722-HD'),
          z.literal('G.726'),
          z.literal('G.729'),
        ]).array().nullable(),
        receive: z.union([
          z.literal('G.711'),
          z.literal('G.722-HD'),
          z.literal('G.726'),
          z.literal('G.729'),
        ]).array().nullable(),
      })
      .strict(),
  })
  .strict();

export const callListSchema = z.array(callSchema);
