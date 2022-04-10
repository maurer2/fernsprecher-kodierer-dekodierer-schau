import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getCallList } from './callsApi';
import type { CallsSliceState, Call } from './calls.types';

const initialState: CallsSliceState = {
  isLoading: false,
  callList: [],
  hasRedirectedToLatestCall: false,
};

export const getCalls = createAsyncThunk('calls/getCalls', async () => {
  const calls = await getCallList();
  console.log('calls loaded');

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCalls.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCalls.fulfilled, (state, action) => {
        state.callList = state.callList.concat(action.payload);
        state.isLoading = false;
      });
  },
});

export const { addCall, setHasRedirectedToLatestCall } = callsSlice.actions;
export default callsSlice.reducer;
