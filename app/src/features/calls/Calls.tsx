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
  const { isLoading, callList, callList2 } = useSelector((state: RootState) => state.calls);
  const daysWithCalls = useSelector(getUniqueDatesOfDaysWithCalls);
  // const mostRecentDay = useSelector(getMostRecentDate);

  // https://github.com/reduxjs/redux-toolkit/issues/587#issuecomment-1049488808
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();
  const { day = null } = useParams();

  // fetch calls
  useEffect(() => {
    dispatch(getCalls());
  }, [dispatch]);

  // temp
  // useEffect(() => {
  //   dispatch(setCurrentDate(day));
  // }, [dispatch, day]);

  //   // navigate(`/calls/${mostRecentDay.iso}`);
  //   // dispatch(setHasRedirectedToLatestCall(true));
  // }, [navigate, dispatch, hasRedirectedToLatestCall, mostRecentDay]);

  // useEffect(() => {
  //   if (!day) {
  //     dispatch(setHasRedirectedToLatestCall(false));
  //   }
  // }, [day, dispatch]);

  console.log(day);

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
            !day || !callList2
              ? (<div />) // todo
              : (
                <CallList
                  calls={callList2}
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
