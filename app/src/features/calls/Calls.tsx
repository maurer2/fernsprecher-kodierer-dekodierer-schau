import { ReactElement, useEffect } from 'react';
import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { getCalls } from './callsSlice';
import { getCallsUnsorted, getDaysWithCalls } from './callsSelectors';
import Navigation from './components/Navigation';
import CallList from './components/CallList';
import {
  useLocation, matchPath
} from "react-router-dom";

export default function Calls(): ReactElement {
  const isLoading = useSelector((state: RootState) => state.calls.isLoading);
  const calls = useSelector(getCallsUnsorted);
  const daysWithCalls = useSelector(getDaysWithCalls);
  const dispatch = useDispatch();
  const {pathname} = useLocation()

  const hasDayParameter = matchPath(
    { path: "/calls/:day" },
    pathname,
  ) !== null

  useEffect(() => {
    const getCallsAction = getCalls();
    dispatch(getCallsAction);
  }, [dispatch]);

  return (
    <div className="container">
      <h2>Calls</h2>
      {isLoading ? (
        <h2>Is Loading!</h2>
      ) : (
        <>
          <Navigation daysWithCalls={daysWithCalls} />
          {hasDayParameter && <CallList calls={calls} />}
        </>
      )}
    </div>
  );
}
