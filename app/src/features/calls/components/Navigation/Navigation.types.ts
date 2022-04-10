import type { Call } from "../../store/calls.types";
export type NavigationProps = {
  daysWithCalls: Call['dates'][];
  currentDay: string | null;
};
