import { Call } from '../../Calls.types';

type Count = {
  count: string;
  percentage: number;
}

type Statistics = [dateTime: string, statistics: Count];

export type CallListProps = {
  calls: Call[];
  sendStatistics?: Statistics[];
};
