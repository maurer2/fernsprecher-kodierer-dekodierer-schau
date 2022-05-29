import { CallMap } from '../../store/calls.types';

export type CallListProps = {
  calls: CallMap;
  currentDay: string | null;
};
