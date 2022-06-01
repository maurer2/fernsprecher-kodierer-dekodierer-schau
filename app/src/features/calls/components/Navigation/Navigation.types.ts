import type { CallDate } from '../../store/calls.types';

export type NavigationProps = {
  daysWithCalls: CallDate[];
  currentDay: string | null;
};

export const dateNavigation = {
  previousDate: 'previous-date',
  nextDate: 'next-date',
} as const;

export type DateNavigationKeys = keyof typeof dateNavigation;

export type DateNavigationValues = typeof dateNavigation[DateNavigationKeys];
