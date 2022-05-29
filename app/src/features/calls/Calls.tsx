import { ReactElement, useEffect, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '../../app/store';
import { getCalls, setHasRedirectedToLatestCall, setCurrentDate } from './store/callsSlice';
import {
  getCallsUnsorted,
  getUniqueDatesOfDaysWithCalls,
  getMostRecentDate,
  getNavigationDates,
} from './store/callsSelectors';

import Navigation from './components/Navigation';
import Overlay from './components/Overlay';
import CallList from './components/CallList';

import * as Types from './Calls.types';
import * as Styles from './Calls.styles';

const Calls: FC<Readonly<Types.CallsProps>> = (): ReactElement => {
  const { isLoading, hasRedirectedToLatestCall } = useSelector((state: RootState) => state.calls);
  const calls = useSelector(getCallsUnsorted);
  const daysWithCalls = useSelector(getUniqueDatesOfDaysWithCalls);
  const mostRecentDay = useSelector(getMostRecentDate);
  const [prevDate, currentDate, nextDate] = useSelector(getNavigationDates);

  console.log(prevDate, currentDate, nextDate);

  // https://github.com/reduxjs/redux-toolkit/issues/587#issuecomment-1049488808
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();

  const { day = null } = useParams();

  useEffect(() => {
    dispatch(getCalls());
  }, [dispatch]);

  // temp
  useEffect(() => {
    dispatch(setCurrentDate(day));
  }, [dispatch, day]);

  // useEffect(() => {
  //   if (!mostRecentDay) {
  //     return;
  //   }

  //   // navigate(`/calls/${mostRecentDay.iso}`);
  //   // dispatch(setHasRedirectedToLatestCall(true));
  // }, [navigate, dispatch, hasRedirectedToLatestCall, mostRecentDay]);

  useEffect(() => {
    if (!day) {
      dispatch(setHasRedirectedToLatestCall(false));
    }
  }, [day, dispatch]);

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
            <Navigation
              daysWithCalls={daysWithCalls}
              currentDay={day}
            />
            {
            day
              ? (
                <CallList
                  calls={calls}
                  currentDay={day}
                />
              )
              : null
            }
          </>
        ) : null}
      </Styles.Content>
      <Overlay isShowing={isLoading}>Loading calls</Overlay>
    </Styles.View>
  );
};

export default Calls;
