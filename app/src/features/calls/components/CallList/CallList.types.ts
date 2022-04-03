import { Call } from '../../store/calls.types';

export type CallListProps = {
  calls: Call[];
  currentDay: string | null;
};
