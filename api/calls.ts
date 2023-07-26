import { callSchema } from '../scraper/schema/callList';
import { createFixture } from 'zod-fixture';

function getCall() {
  return createFixture(callSchema, {
    array: {
      min: 1,
      max: 2,
    },
  });
}

export const calls = {
  calls: Array.from({ length: 100 }, getCall),
};
