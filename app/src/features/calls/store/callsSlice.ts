import {
  createSlice, PayloadAction, createAsyncThunk, current,
} from '@reduxjs/toolkit';
import { getCallList } from './callsApi';
import type {
  CallsSliceState, Call, CallDates, CallMap,
} from './calls.types';

const initialState: CallsSliceState = {
  isLoading: false,
  callList: [],
  callList2: {},
  hasRedirectedToLatestCall: false,
  currentDate: null,
};

export const getCalls = createAsyncThunk('calls/getCalls', async () => {
  const calls = await getCallList();

  return calls;
});

export const callsSlice = createSlice({
  name: 'Calls',
  initialState,
  reducers: {
    addCall: (state, action: PayloadAction<Call>) => {
      state.callList.push(action.payload);
    },
    setHasRedirectedToLatestCall: (state, action: PayloadAction<boolean>) => {
      state.hasRedirectedToLatestCall = action.payload;
    },
    setCurrentDate: (state, action: PayloadAction<string | null>) => {
      if (!state.callList || !action.payload) {
        state.currentDate = null;
      }

      const currentDate = state.callList.find((call) => call.dates.iso === action.payload) ?? null;
      state.currentDate = currentDate?.dates ?? null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCalls.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCalls.fulfilled, (state, action) => {
        console.log(current(state));

        const callList2: CallMap = Object.fromEntries(
          action.payload.map((call, index) => [index.toString(), call]),
        );

        state.callList = state.callList.concat(action.payload);
        state.callList2 = callList2;
        state.isLoading = false;
      })
      .addCase(getCalls.rejected, (state) => {
        state.callList = [];
        state.isLoading = false;
      });
  },
});

export const { addCall, setHasRedirectedToLatestCall, setCurrentDate } = callsSlice.actions;
export default callsSlice.reducer;
