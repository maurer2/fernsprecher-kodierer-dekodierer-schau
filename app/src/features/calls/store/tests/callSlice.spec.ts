import { createAction } from '@reduxjs/toolkit';
import reducer, { getCalls } from '../callsSlice';
import type { CallsSliceState, CallWithDates } from '../calls.types';

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
        {
          dateTime: 1643695823000,
          dates: {
            iso: '2022-02-01',
            user: '01/02/2022',
          },
          codecs: {
            send: 'G.722',
            receive: 'G.722',
          },
        },
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
        '2022-01-04',
        '2022-01-05',
        '2022-02-01',
        '2022-03-18',
      ]);

      // grouped correctly
      const entries = Object.values(state?.callList ?? {});
      expect(entries.every((entry) => Boolean(entry?.entries?.length))).toBe(true);

      const entriesWithSingleEntries = [...entries];
      entriesWithSingleEntries.splice(2, 1);
      expect(entriesWithSingleEntries.every((entry) => Boolean(entry?.entries?.length === 1))).toBe(
        true,
      );

      const entriesWithMultipleEntries = [...entries];
      expect(entriesWithMultipleEntries[2].entries.length).toBe(2);
    });
  });
});
