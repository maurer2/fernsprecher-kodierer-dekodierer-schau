import { ReactElement, useEffect, VFC } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { getCalls, setHasRedirectedToLatestCall } from './store/callsSlice';
import {
  getCallsUnsorted,
  getDaysWithCalls,
  getMostRecentDayWithCall,
} from './store/callsSelectors';

import Navigation from './components/Navigation';
import Overlay from './components/Overlay';
import CallList from './components/CallList';

import * as Types from './Calls.types';
import * as Styles from './Calls.styles';

const Calls: VFC<Readonly<Types.CallsProps>> = (): ReactElement => {
  const { isLoading, hasRedirectedToLatestCall } = useSelector((state: RootState) => state.calls);
  const calls = useSelector(getCallsUnsorted);
  const daysWithCalls = useSelector(getDaysWithCalls);
  const mostRecentDay = useSelector(getMostRecentDayWithCall);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { day = null } = useParams();

  useEffect(() => {
    dispatch(getCalls());
  }, [dispatch]);

  useEffect(() => {
    if (hasRedirectedToLatestCall || !mostRecentDay) {
      return;
    }

    navigate(`/calls/${mostRecentDay.iso}`);
    dispatch(setHasRedirectedToLatestCall(true));
  }, [navigate, dispatch, hasRedirectedToLatestCall, mostRecentDay]);

  return (
    <Styles.Calls>
      <h1>
        <NavLink
          to="/calls/"
          className="home-link"
        >
          Calls
        </NavLink>
      </h1>
      <Overlay isShowing={isLoading}>Loading calls</Overlay>
      {!isLoading ? (
        <>
          <Navigation
            daysWithCalls={daysWithCalls}
            currentDay={day}
          />
          <CallList
            calls={calls}
            currentDay={day}
          />
        </>
      ) : null}
    </Styles.Calls>
  );
};

export default Calls;
