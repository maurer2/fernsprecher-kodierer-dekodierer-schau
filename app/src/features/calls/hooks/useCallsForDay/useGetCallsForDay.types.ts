import { Call, CallMap } from '../../store/calls.types';

export type PropsUseGetCallsForDay = {
  callList: CallMap,
  currentDay?: string | null,
};
