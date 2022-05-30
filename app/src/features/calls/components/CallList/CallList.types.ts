import { CallMap } from '../../store/calls.types';

export type CallListProps = {
  callList: CallMap;
  currentDay: string | null;
};
