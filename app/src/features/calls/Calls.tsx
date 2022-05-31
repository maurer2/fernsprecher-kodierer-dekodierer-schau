import { ReactElement, useEffect, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '../../app/store';
import { getCalls } from './store/callsSlice';
import {
  getUniqueDatesOfDaysWithCalls,
  getCallsForDate,
  // getNavigationDates,
} from './store/callsSelectors';

import Navigation from './components/Navigation';
import Overlay from './components/Overlay';
import CallList from './components/CallList';

import * as Types from './Calls.types';
import * as Styles from './Calls.styles';

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
    <Styles.View>
      <Styles.Header>
        <Styles.Title>
          <Styles.TitleLink to="/calls">Calls</Styles.TitleLink>
        </Styles.Title>
      </Styles.Header>
      <Styles.Content>
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
      </Styles.Content>
      <Overlay isShowing={isLoading}>Loading calls</Overlay>
    </Styles.View>
  );
};

export default Calls;
