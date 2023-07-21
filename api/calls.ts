// import { z } from 'zod';
// import { generateMock } from '@anatine/zod-mock';
import { mockCallSchema, mockCallListSchema } from '../scraper/schema/callList';

export const calls = {
  calls: mockCallListSchema,
};
