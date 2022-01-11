import {ReactElement} from 'react';
import { RootState } from '../../app/store';

export default function Calls(): ReactElement  {
  const x = 5;

  function handleClick(): void {
    console.log('click');
  }

  return (
    <div className='container'>
      <code>
        {x}
      </code>
      <button type="button" onClick={handleClick}>
        Add call
      </button>
    </div>
  )
}
