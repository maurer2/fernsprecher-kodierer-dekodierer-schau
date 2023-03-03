import { z } from 'zod';
import { callListSchema } from '../schema/callList';

export type CallListSchema = z.infer<typeof callListSchema>;
