import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getCallList } from './callsApi';
import type { Call } from './callsApi';

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

const initialState: CallSliceState = {
  isLoading: false,
  calls: [Date.now()],
  callList: [],
}

export const callSlice = createSlice({
  name: 'Calls',
  initialState,
  reducers: {
    addCall: (state, action: PayloadAction<typeof state['calls'][number]>) => {
      console.log(action.payload);

      state.calls.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // real calls
      .addCase(getCalls.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCalls.fulfilled, (state, action) => {
        state.callList = state.callList.concat(action.payload)
        state.isLoading = false;
      })
  },
});

export const { addCall } = callSlice.actions;
export default callSlice.reducer;
