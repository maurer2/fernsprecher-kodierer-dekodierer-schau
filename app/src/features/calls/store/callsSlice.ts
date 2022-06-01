import {
  createSlice, PayloadAction, createAsyncThunk, current,
} from '@reduxjs/toolkit';
import { groupBy } from 'lodash-es';
import { getCallList } from './callsApi';
import type {
  CallsSliceState, CallWithDates, CallMap, CallWithDatesMap, Day,
} from './calls.types';

const initialState: CallsSliceState = {
  isLoading: false,
  callList: null,
  mostRecentDay: null,
  currentDate: null,
};

export const getCalls = createAsyncThunk('calls/getCalls', async () => {
  const calls: CallWithDates[] = await getCallList();

  return calls;
});

export const callsSlice = createSlice({
  name: 'Calls',
  initialState,
  reducers: {
    // addCall: (state, action: PayloadAction<Call>) => {
    //   state.callList.push(action.payload);
    // },
    // setHasRedirectedToLatestCall: (state, action: PayloadAction<boolean>) => {
    //   state.hasRedirectedToLatestCall = action.payload;
    // },
    // setCurrentDate: (state, action: PayloadAction<string | null>) => {
    //   if (!state.callList || !action.payload) {
    //     state.currentDate = null;
    //   }
    //   const currentDate = state.callList.find((call) => call.dates.iso === action.payload)
    // ?? null;
    //   state.currentDate = currentDate?.dates ?? null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCalls.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCalls.fulfilled, (state, action) => {
        const callsSorted: CallWithDates[] = [...action.payload].sort(
          (a, z) => a.dateTime - z.dateTime,
        );

        // grouping
        const callsGroupedByIsoDate: Record<Day, CallWithDates[]> = groupBy(
          callsSorted,
          'dates.iso',
        );
        const callsGrouped: CallMap = Object.fromEntries(
          Object.entries(callsGroupedByIsoDate).map(([day, entries]) => {
            const entriesWithoutDate = entries.map(({ dateTime, codecs }) => ({
              dateTime,
              codecs,
            }));
            const entriesFormatted: CallMap[number] = {
              dayDates: entries[0].dates,
              entries: entriesWithoutDate,
            };

            return [day, entriesFormatted];
          }),
        );

        const mostRecentDay = callsSorted?.at(-1)?.dates ?? null;

        state.isLoading = false;
        state.callList = callsGrouped;
        state.mostRecentDay = mostRecentDay;
      })
      .addCase(getCalls.rejected, (state) => {
        state.isLoading = false;
        state.callList = null;
        state.mostRecentDay = null;
      });
  },
});

// export const { addCall, setCurrentDate } = callsSlice.actions;
export default callsSlice.reducer;
