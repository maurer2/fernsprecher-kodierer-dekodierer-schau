import { Fragment, ReactElement, MouseEvent } from 'react';
import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { getCalls } from './callsSlice';
import { getCallsUnsorted, getSendCodecsQuantities, getDaysWithCalls } from './callsSelectors';

export default function Calls(): ReactElement {
  const isLoading = useSelector((state: RootState) => state.calls.isLoading);
  const callList = useSelector(getCallsUnsorted);
  const sendCodecs = useSelector(getSendCodecsQuantities);
  const daysWithCalls = useSelector(getDaysWithCalls);

  const dispatch = useDispatch();

  function handleClick(): void {
    const getCallsAction = getCalls();

    dispatch(getCallsAction);
  }

  function handleNavClick(event: MouseEvent<HTMLButtonElement>, day: string): void {
    event.preventDefault();
    console.log('day clicked:', day);
  }

  return (
    <div className="container">
      <button type="button" onClick={handleClick} disabled={isLoading}>
        Load calls
      </button>
      <div>
        <h2>Send Codecs distribution:</h2>
        <dl>
          {Object.entries(sendCodecs).map(([key, value]) => (
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
        <code>List length: {callList.length}</code>
      </div>
      <div>
        <code>
          <pre>{JSON.stringify(callList, null, 2)}</pre>
        </code>
      </div>
    </div>
  );
}
