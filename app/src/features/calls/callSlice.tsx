import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type Call = {
//   dateTime: typeof Date['now'],
//   codecs: {
//     send: string | null,
//     receive: string | null,
//   }
// }

type CallSliceState = {
  calls: ReturnType<typeof Date['now']>[];
  test: string;
};

export const callSlice = createSlice({
  name: 'Calls',
  initialState: {
    calls: [Date.now()],
    test: 'meow',
  } as CallSliceState,
  reducers: {
    addCall: (state, action: PayloadAction<typeof state['calls'][number]>) => {
      console.log(action.payload);

      state.calls.push(action.payload);
    },
  },
});

export const { addCall } = callSlice.actions;
export default callSlice.reducer;
