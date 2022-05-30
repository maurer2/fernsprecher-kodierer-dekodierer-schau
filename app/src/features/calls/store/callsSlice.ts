import {
  createSlice, PayloadAction, createAsyncThunk, current,
} from '@reduxjs/toolkit';
import { groupBy } from 'lodash-es';
import { getCallList } from './callsApi';
import type { CallsSliceState, Call, CallMap } from './calls.types';

const initialState: CallsSliceState = {
  isLoading: false,
  callList: null,
  mostRecentDay: null,
  currentDate: null,
};

export const getCalls = createAsyncThunk('calls/getCalls', async (_, { dispatch }) => {
  const calls = await getCallList();

  // dispatch({ type: 'Calls/setCurrentDate2', payload: { calls } });
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
        const callsSorted = [...action.payload].sort((a, z) => a.dateTime - z.dateTime);
        const callsGroupedByDayPrev = groupBy(callsSorted, 'dates.iso');
        const callsGroupedByDay: CallMap = Object.fromEntries(
          Object.entries(callsGroupedByDayPrev)
            .map(([day, entries]) => {
              const entriesFormatted: CallMap[number] = {
                dayDates: entries[0].dates,
                entries,
              }; // todo remove complexity

              return [day, entriesFormatted];
            }),
        );
        const mostRecentDay = callsSorted?.at(-1)?.dates ?? null;

        state.isLoading = false;
        state.callList = callsGroupedByDay;
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
