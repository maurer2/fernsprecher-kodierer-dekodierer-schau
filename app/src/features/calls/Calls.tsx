import { Fragment, ReactElement, MouseEvent, useEffect, useMemo } from 'react';
import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { getCalls } from './callsSlice';
import { getCallsUnsorted, getSendCodecsQuantities, getDaysWithCalls } from './callsSelectors';
import useCallListGroupedByDate from './hooks/useCallListGroupedByDate';

export default function Calls(): ReactElement {
  const isLoading = useSelector((state: RootState) => state.calls.isLoading);
  const callList = useSelector(getCallsUnsorted);
  const sendCodecs = useSelector(getSendCodecsQuantities);
  const daysWithCalls = useSelector(getDaysWithCalls);
  // const sendCodecsWithTimestamp = useSelector(getSendCodecs)

  const dispatch = useDispatch();

  const [groupedCallList] = useCallListGroupedByDate(callList);

  console.log(groupedCallList)

  const sendStatistics = useMemo(() => Object.entries(sendCodecs), [sendCodecs]);

  function handleNavClick(event: MouseEvent<HTMLButtonElement>, day: string): void {
    event.preventDefault();
    console.log('day clicked:', day);
  }

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
          <div>
            <h2>Send Codecs distribution:</h2>
            <dl>
              {sendStatistics.map(([key, value]) => (
                <Fragment key={key}>
                  <dt>{key}:</dt>
                  <dt>{value.percentage.toFixed(2)}%</dt>
                </Fragment>
              ))}
            </dl>
          </div>
          <div>
            <h2>Date nav:</h2>
            {daysWithCalls.map((day) => (
              <button
                key={day}
                type="button"
                onClick={(event: MouseEvent<HTMLButtonElement>) => handleNavClick(event, day)}
              >
                {day}
              </button>
            ))}
          </div>
          <div>
            <code>
              <pre>{JSON.stringify(callList, null, 2)}</pre>
            </code>
          </div>
        </>
      )}
    </div>
  );
}
