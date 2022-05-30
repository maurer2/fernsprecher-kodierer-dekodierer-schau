import { Call, CallMap } from '../../store/calls.types';

export type PropsUseGetCallsForDay = {
  calls: CallMap,
  currentDay?: string | null,
};
