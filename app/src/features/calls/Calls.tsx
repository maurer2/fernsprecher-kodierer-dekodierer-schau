import { ReactElement } from 'react';
import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { getCalls } from './callsSlice';
import { getCallsUnsorted, getSendCodecsQuantities } from './callsSelectors';

export default function Calls(): ReactElement {
  const isLoading = useSelector((state: RootState) => state.calls.isLoading);
  const callList = useSelector(getCallsUnsorted);
  const sendCodecs = useSelector(getSendCodecsQuantities);

  const dispatch = useDispatch();

  function handleClick(): void {
    const getCallsAction = getCalls();

    dispatch(getCallsAction);
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
            <>
              <dt>{key}:</dt>
              <dt>{value.percentage.toFixed(2)}%</dt>
            </>
          ))}
        </dl>
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
