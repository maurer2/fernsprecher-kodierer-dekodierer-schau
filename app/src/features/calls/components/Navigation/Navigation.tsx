import { ReactElement, useEffect, MouseEvent, Fragment, VFC } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import * as Types from './Navigation.types'

const Navigation: VFC<Readonly<Types.NavigationProps>> = ({daysWithCalls}): ReactElement => {
  // let navigate = useNavigate();

  // function handleNavClick(event: MouseEvent<HTMLButtonElement>, day: string): void {
  //   event.preventDefault();
  //   console.log('day clicked:', day);

  //   navigate('/${day')
  // }

  useEffect(() => {
    // console.log('mounted', props);
  }, [daysWithCalls]);

  return (
    <nav className='nav'>
      {daysWithCalls.map((day) => (
        <Fragment key={day}>
          <Link
            to={`/${day}`}
            className='nav-link'
            // onClick={(event: MouseEvent<HTMLButtonElement>) => handleNavClick(event, day)}
          >
            {day}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}

export default Navigation
