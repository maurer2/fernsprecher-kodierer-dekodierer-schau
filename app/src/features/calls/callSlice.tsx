import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getEntry } from './CallsApi';

// type Call = {
//   dateTime: typeof Date['now'],
//   codecs: {
//     send: string | null,
//     receive: string | null,
//   }
// }

export const getCallEntry = createAsyncThunk(
  'calls/getCallEntry',
  async () => {
    const entry = await getEntry();

    return entry;
  }
);

type CallSliceState = {
  calls: ReturnType<typeof Date['now']>[];
  isLoading: boolean;
};

export const callSlice = createSlice({
  name: 'Calls',
  initialState: {
    calls: [Date.now()],
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
      .addCase(getCallEntry.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCallEntry.fulfilled, (state, action) => {
        state.calls.push(action.payload)
        state.isLoading = false;
      })
  },
});

export const { addCall } = callSlice.actions;
export default callSlice.reducer;
