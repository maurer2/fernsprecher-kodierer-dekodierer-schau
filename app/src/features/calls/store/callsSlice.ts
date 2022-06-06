import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getCallList } from './callsApi';
import type {
  CallsSliceState, CallWithDates, CallMap, Day,
} from './calls.types';

const initialState: CallsSliceState = {
  isLoading: false,
  callList: null,
  mostRecentDay: null,
  currentDate: null,
};

const getCalls = createAsyncThunk('calls/getCalls', async () => {
  const calls: CallWithDates[] = await getCallList();

  return calls;
});

export const callsSlice = createSlice({
  name: 'Calls',
  initialState,
  reducers: {
    addCall: (state) => {
      state.isLoading = true;
    },
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
      .addCase(
        getCalls.fulfilled,
        (state, { payload }: PayloadAction<ReadonlyArray<CallWithDates>>) => {
          const callsGroupedByIsoDate: Record<Day, CallWithDates[]> = payload.reduce(
            (total, current) => {
              if (!(current.dates.iso in total)) {
                total[current.dates.iso] = [];
              }

              total[current.dates.iso].push(current);

              return total;
            },
            {} as Record<Day, CallWithDates[]>,
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

          const mostRecentDate = payload.reduce((prev: CallWithDates, current: CallWithDates) => {
            if (current.dates.iso > prev.dates.iso) {
              return current;
            }
            return prev;
          });

          state.isLoading = false;
          state.callList = callsGrouped;
          state.mostRecentDay = mostRecentDate.dates;
        },
      )
      .addCase(getCalls.rejected, (state) => {
        state.isLoading = false;
        state.callList = null;
        state.mostRecentDay = null;
      });
  },
});

export const { addCall } = callsSlice.actions;
export { getCalls };
export default callsSlice.reducer;
