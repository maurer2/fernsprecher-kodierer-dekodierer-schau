import type { Call } from '../../store/calls.types';

export type NavigationProps = {
  daysWithCalls: Call['dates'][];
  currentDay: string | null;
};

export const dateNavigation = ['previous-date', 'next-date'] as const;
export type DateNavigation = typeof dateNavigation[number];
