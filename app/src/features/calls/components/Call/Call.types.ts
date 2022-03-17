import { Call } from '../../callsApi';

type Count = {
  count: string;
  percentage: number;
}

type Statistics = [dateTime: string, statistics: Count];

export type CallProps = {
  calls: Call[];
  sendStatistics: Statistics[];
};
