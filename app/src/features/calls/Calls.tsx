import { ReactElement, useEffect, VFC } from 'react';
import { useLocation, matchPath } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { getCalls } from './callsSlice';
import { getCallsUnsorted, getDaysWithCalls } from './callsSelectors';

import Navigation from './components/Navigation';
import Call from './components/Call';
import Overlay from './components/Overlay';

import * as Types from './Calls.types';

const Calls: VFC<Readonly<Types.CallsProps>> = (): ReactElement  => {
  const isLoading = useSelector((state: RootState) => state.calls.isLoading);
  const calls = useSelector(getCallsUnsorted);
  const daysWithCalls = useSelector(getDaysWithCalls);
  const dispatch = useDispatch();
  const {pathname} = useLocation();

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
      <h1>Calls</h1>
      {isLoading ? (
        <Overlay isShowing={true}>
          <>
            Loading calls
          </>
        </Overlay>
      ) : (
        <>
          <Navigation daysWithCalls={daysWithCalls} />
          {hasDayParameter && <Call calls={calls} />}
        </>
      )}
    </div>
  );
}

export default Calls;
