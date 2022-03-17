import { ReactElement, useEffect, useMemo } from 'react';
import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { getCalls } from './callsSlice';
import { getCallsUnsorted, /*getSendCodecsQuantities,*/ getDaysWithCalls } from './callsSelectors';
import Navigation from './components/Navigation';
import CallList from './components/CallList';

export default function Calls(): ReactElement {
  const isLoading = useSelector((state: RootState) => state.calls.isLoading);
  const calls = useSelector(getCallsUnsorted);
  // const sendCodecs = useSelector(getSendCodecsQuantities);
  const daysWithCalls = useSelector(getDaysWithCalls);

  const dispatch = useDispatch();
  // const sendStatistics = useMemo(() => Object.entries(sendCodecs), [sendCodecs]);

  useEffect(() => {
    const getCallsAction = getCalls();
    dispatch(getCallsAction);
  }, [dispatch]);

  return (
    <div className="container">
      {isLoading ? (
        <h2>Is Loading!</h2>
      ) : (
        <>
          <Navigation daysWithCalls={daysWithCalls} />
          <CallList calls={calls} />
        </>
      )}
    </div>
  );
}
