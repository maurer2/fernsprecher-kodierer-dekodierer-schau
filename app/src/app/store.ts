import { configureStore } from '@reduxjs/toolkit';
import callSliceReducer from '../features/calls/callSlice';

export const store = configureStore({
  reducer: {
    calls: callSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
