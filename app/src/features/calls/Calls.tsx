import { ReactElement, useEffect, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const Calls: FC<Readonly<Types.CallsProps>> = (): ReactElement => {
  const { isLoading, hasRedirectedToLatestCall } = useSelector((state: RootState) => state.calls);
  const calls = useSelector(getCallsUnsorted);
  const daysWithCalls = useSelector(getDaysWithCalls);
  const mostRecentDay = useSelector(getMostRecentDayWithCall);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { day = null } = useParams();

  useEffect(() => {
    dispatch(getCalls() as any); // todo fix
  }, [dispatch]);

  useEffect(() => {
    if (hasRedirectedToLatestCall || !mostRecentDay) {
      return;
    }

    navigate(`/calls/${mostRecentDay.iso}`);
    dispatch(setHasRedirectedToLatestCall(true));
  }, [navigate, dispatch, hasRedirectedToLatestCall, mostRecentDay]);

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
