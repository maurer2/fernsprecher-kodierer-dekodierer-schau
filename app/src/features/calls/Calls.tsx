import type { ReactElement, FC } from 'react';
import { useEffect } from 'react';
import {
  useParams, useNavigate, NavLink,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, Dispatch } from '../../app/store';
import { getCalls } from './store/callsSlice';
import {
  getUniqueDatesOfDaysWithCalls,
  getCallsForDate,
  // getNavigationDates,
} from './store/callsSelectors';

import Navigation from './components/Navigation';
import Overlay from './components/Overlay';
import CallList from './components/CallList';

import type * as Types from './Calls.types';
import * as Styles from './Calls.css';

const Calls: FC<Readonly<Types.CallsProps>> = (): ReactElement => {
  const { day = null } = useParams();

  const isLoading = useSelector((state: RootState) => state.calls.isLoading);
  const mostRecentDay = useSelector((state: RootState) => state.calls.mostRecentDay);
  const daysWithCalls = useSelector(getUniqueDatesOfDaysWithCalls);
  const callsForCurrentDate = useSelector(getCallsForDate(day));

  // https://github.com/reduxjs/redux-toolkit/issues/587#issuecomment-1049488808
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();

  // fetch calls
  useEffect(() => {
    dispatch(getCalls());
  }, [dispatch]);

  // navigate to most recent day
  useEffect(() => {
    if (!mostRecentDay || Boolean(day)) {
      return;
    }
    // only navigate if dat param is empty
    navigate(`/calls/${mostRecentDay.iso}`);
  }, [navigate, day, mostRecentDay]);

  return (
    <article className={Styles.View}>
      <header className={Styles.Header}>
        <h1 className={Styles.Title}>
          <NavLink className={Styles.TitleLink} to="/calls">
            Calls
          </NavLink>
        </h1>
      </header>
      <main className={Styles.Content}>
        {!isLoading ? (
          <>
            {Boolean(daysWithCalls?.length) && (
              <Navigation
                daysWithCalls={daysWithCalls}
                currentDay={day}
              />
            )}
            {
            !day
              ? (<div>Todo</div>)
              : (
                <CallList
                  callList={callsForCurrentDate}
                  currentDay={day}
                />
              )
            }
          </>
        ) : null}
      </main>
      <Overlay isShowing={isLoading}>Loading calls</Overlay>
    </article>
  );
};

export default Calls;
