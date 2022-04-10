import { ReactElement, useEffect, VFC } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { getCalls } from './store/callsSlice';
import { getCallsUnsorted, getDaysWithCalls, getMostRecentDayWithCall } from './store/callsSelectors';

import Navigation from './components/Navigation';
import Overlay from './components/Overlay';
import CallList from './components/CallList';

import * as Types from './Calls.types';

const Calls: VFC<Readonly<Types.CallsProps>> = (): ReactElement => {
  const isLoading = useSelector((state: RootState) => state.calls.isLoading);
  const calls = useSelector(getCallsUnsorted);
  const daysWithCalls = useSelector(getDaysWithCalls);
  const { day = null } = useParams();
  const mostRecentDay = useSelector(getMostRecentDayWithCall);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const getCallsAction = getCalls();
    dispatch(getCallsAction);

    // if (!mostRecentDay) {
    //   return
    // }

    // navigate(`/calls/${mostRecentDay}`);
  }, [dispatch]);

  return (
    <div className="container">
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
    </div>
  );
};

export default Calls;
