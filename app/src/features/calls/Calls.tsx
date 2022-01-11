import {ReactElement} from 'react';
import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux'
import { addCall } from './callSlice';


export default function Calls(): ReactElement  {
  const numberOfCalls = useSelector((state: RootState) => state.calls.calls.length)
  const callList = useSelector((state: RootState) => state.calls.calls)
  const dispatch = useDispatch()

  function handleClick(): void {
    const currentDate = Date.now();

    dispatch(addCall(currentDate))
  }

  return (
    <div className='container'>
      <code>
        {numberOfCalls}
      </code>
      <code>
        <pre>{JSON.stringify(callList, null, 2)}</pre>
      </code>
      <button type="button" onClick={handleClick}>
        Add a call
      </button>
    </div>
  )
}
