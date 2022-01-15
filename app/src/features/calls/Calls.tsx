import { ReactElement } from 'react';
import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { addCall, getCalls } from './callSlice';

export default function Calls(): ReactElement {
  const {calls, callList} = useSelector((state: RootState) => state.calls);
  const isLoading = useSelector((state: RootState) => state.calls.isLoading);
  const dispatch = useDispatch();

  function handleClickSync(): void {
    const currentDate = Date.now();
    const addCallAction = addCall(currentDate);

    dispatch(addCallAction);
  }

  function handleClickAsync(): void {
    const getCallsAction = getCalls();

    dispatch(getCallsAction);
  }

  return (
    <div className="container">
      <button
        type="button"
        onClick={handleClickSync}
        disabled={isLoading}
      >
        Add a call
      </button>
      <button
        type="button"
        onClick={handleClickAsync}
        disabled={isLoading}
      >
        Add real calls
      </button>
      <div>
        <code>{calls.length} / {callList.length}</code>
      </div>
      <div>
        <code>
          <pre>{JSON.stringify(calls, null, 2)}</pre>
        </code>
      </div>
      <div>
        <code>
          <pre>{JSON.stringify(callList, null, 2)}</pre>
        </code>
      </div>
    </div>
  );
}
