import {
  createSlice, PayloadAction, createAsyncThunk, current, createAction, Action,
} from '@reduxjs/toolkit';
import reducer, { getCalls } from '../callsSlice';
import type {
  CallsSliceState, CallWithDates, CallMap, Day,
} from '../calls.types';

describe('getCalls', () => {
  const initialState: CallsSliceState = {
    isLoading: false,
    callList: null,
    mostRecentDay: null,
    currentDate: null,
  };

  describe('Extra reducers - getCall', () => {
    it('Extra reducers - pending', () => {
      const actionCreator = createAction(getCalls.pending.type);
      const action = actionCreator();

      const state = reducer({ ...initialState }, action);

      expect(state).toEqual(
        expect.objectContaining({
          isLoading: true,
        }),
      );
    });

    it('Extra reducers - fulfilled', () => {
      const testDates: CallWithDates[] = [
        // 0 - Third
        {
          dateTime: 1643700243000,
          dates: {
            iso: '2022-02-01',
            user: '01/02/2022',
          },
          codecs: {
            send: 'G.711',
            receive: 'Unknown',
          },
        },
        // 1 - First
        {
          dateTime: 1641260492000,
          dates: {
            iso: '2022-01-04',
            user: '04/01/2022',
          },
          codecs: {
            send: 'G.722',
            receive: 'G.726',
          },
        },
        // 2 - Fifth
        {
          dateTime: 1647603901000,
          dates: {
            iso: '2022-03-18',
            user: '18/03/2022',
          },
          codecs: {
            send: 'G.722',
            receive: 'G.722',
          },
        },
        // 3 - Fourth
        {
          dateTime: 1645170055000,
          dates: {
            iso: '2022-02-18',
            user: '18/02/2022',
          },
          codecs: {
            send: 'G.726',
            receive: 'G.722',
          },
        },
        // 4 - Second
        {
          dateTime: 1641375569000,
          dates: {
            iso: '2022-01-05',
            user: '05/01/2022',
          },
          codecs: {
            send: 'G.726',
            receive: 'Unknown',
          },
        },
      ];
      const actionCreator = createAction<CallWithDates[]>(getCalls.fulfilled.type);
      const action = actionCreator(testDates);

      const state = reducer({ ...initialState }, action);

      expect(state).toEqual(
        expect.objectContaining({
          isLoading: false,
        }),
      );

      // entries sorted correctly
      expect(Object.keys(state?.callList ?? {})).toEqual([
        testDates[1].dates.iso,
        testDates[4].dates.iso,
        testDates[0].dates.iso,
        testDates[3].dates.iso,
        testDates[2].dates.iso,
      ]);

      // grouped correctly
      // expect(Object.values(state?.callList ?? {})).toBe(true);
    });
  });
});
