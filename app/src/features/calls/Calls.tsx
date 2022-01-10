import { configureStore } from '@reduxjs/toolkit'

type Call = {
  dateTime: typeof Date['now'],
  codecs: {
    send: string | null,
    receive: string | null,
  }
}

const initialState = {
  calls: []
};

export const store = configureStore({
  preloadedState: initialState,
  reducer: {}
})

export default initialState
