import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getCallList } from './callsApi';
import type { CallsSliceState } from './Calls.types';


const initialState: CallsSliceState = {
  isLoading: false,
  calls: [Date.now()],
  callList: [],
}


export const getCalls = createAsyncThunk(
  'calls/getCalls',
  async () => {
    const calls = await getCallList();

    return calls;
  }
);

export const callsSlice = createSlice({
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

export const { addCall } = callsSlice.actions;
export default callsSlice.reducer;
