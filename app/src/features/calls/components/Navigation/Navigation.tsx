import { ReactElement, useEffect, MouseEvent, Fragment, VFC } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import * as Types from './Navigation.types'

const Navigation: VFC<Readonly<Types.NavigationProps>> = ({daysWithCalls}): ReactElement => {
  const activeDate = false

  return (
    <nav className='nav'>
      {daysWithCalls.map((day) => (
        <Fragment key={day}>
          <Link
            to={`/calls/${day}`}
            className='nav-link'
          >
            {day}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}

export default Navigation
