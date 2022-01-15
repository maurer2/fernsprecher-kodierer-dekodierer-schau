import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getEntry, getCallList } from './callsApi';
import type { Call } from './callsApi';

export const getCallEntry = createAsyncThunk(
  'calls/getCallEntry',
  async () => {
    const entry = await getEntry();

    return entry;
  }
);

export const getCalls = createAsyncThunk(
  'calls/getCalls',
  async () => {
    const calls = await getCallList();

    return calls;
  }
);

type CallSliceState = {
  calls: ReturnType<typeof Date['now']>[];
  callList: Call[];
  isLoading: boolean;
};

export const callSlice = createSlice({
  name: 'Calls',
  initialState: {
    calls: [Date.now()],
    callList: [],
    isLoading: false,
  } as CallSliceState,
  reducers: {
    addCall: (state, action: PayloadAction<typeof state['calls'][number]>) => {
      console.log(action.payload);

      state.calls.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // test entries
      .addCase(getCallEntry.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCallEntry.fulfilled, (state, action) => {
        state.calls.push(action.payload)
        state.isLoading = false;
      })
      // real calls
      .addCase(getCalls.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCalls.fulfilled, (state, action) => {
        state.callList = [...state.callList, ...action.payload]
        state.isLoading = false;
      })
  },
});

export const { addCall } = callSlice.actions;
export default callSlice.reducer;
