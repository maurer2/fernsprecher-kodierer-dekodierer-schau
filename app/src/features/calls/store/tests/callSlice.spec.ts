import reducer, { getCalls } from '../callsSlice';

describe('getCalls', () => {
  it('Extra reducer - INITIAL', () => {
    const initialState = {
      isLoading: false,
      callList: null,
      mostRecentDay: null,
      currentDate: null,
    };

    const action = { type: getCalls.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual(
      expect.objectContaining({
        isLoading: true,
      }),
    );
  });
});
