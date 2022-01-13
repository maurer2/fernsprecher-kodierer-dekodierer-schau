import { ReactElement } from 'react';
import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { addCall } from './callSlice';

export default function Calls(): ReactElement {
  const callList = useSelector((state: RootState) => state.calls.calls);
  const dispatch = useDispatch();

  function handleClick(): void {
    const currentDate = Date.now();
    const addCallAction = addCall(currentDate);

    dispatch(addCallAction);
  }

  return (
    <div className="container">
      <button type="button" onClick={handleClick}>
        Add a call
      </button>
      <div>
        <code>{callList.length}</code>
      </div>
      <div>
        <code>
          <pre>{JSON.stringify(callList, null, 2)}</pre>
        </code>
      </div>
    </div>
  );
}
