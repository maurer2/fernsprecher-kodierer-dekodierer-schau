import { Call } from '../../store/calls.types';

export type CallListProps = {
  callList: Call[];
  currentDay: string | null;
};
