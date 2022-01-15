import { configureStore } from '@reduxjs/toolkit';
import callsSliceReducer from '../features/calls/callsSlice';

export const store = configureStore({
  reducer: {
    calls: callsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
