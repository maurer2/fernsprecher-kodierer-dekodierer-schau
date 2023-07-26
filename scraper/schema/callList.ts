import { z } from 'zod';

const codecNames =  z.union([
  z.literal('G.711'),
  // z.literal('G.722'),
  z.literal('G.722-HD'),
  z.literal('G.726'),
  z.literal('G.729'),
])

export const callSchema = z.object({
  dateTime: z.string().datetime().nullable(),
  codecs: z.object({
    send: z.array(codecNames).nullable(),
    receive: z.array(codecNames).nullable(),
  })
  .strict(),
})
.strict();

export const callListSchema = z.array(callSchema);
