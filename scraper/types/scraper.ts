import { z } from 'zod';
import { callListSchema } from '../schema/callList';

export type CallListSchemaStringified = {
  dateTime: string | null;
  codecs: {
    send: string | null;
    receive: string | null;
  };
}[]

export type CallListSchema = z.infer<typeof callListSchema>;
