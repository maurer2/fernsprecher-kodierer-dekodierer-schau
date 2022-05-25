import type { Call } from '../../store/calls.types';

export type NavigationProps = {
  daysWithCalls: Call['dates'][];
  currentDay: string | null;
};

export const dateNavigation = {
  previousDate: 'previous-date',
  nextDate: 'next-date',
} as const;

export type DateNavigationKeys = keyof typeof dateNavigation;

export type DateNavigationValues = typeof dateNavigation[DateNavigationKeys];
