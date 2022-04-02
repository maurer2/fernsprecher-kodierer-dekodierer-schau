import { ReactElement, Fragment, VFC } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import * as Types from './Navigation.types'

const Navigation: VFC<Readonly<Types.NavigationProps>> = ({daysWithCalls}): ReactElement => {
  const activeDate = false;
  const { day = '' } = useParams();

  return (
    <nav className='nav'>
      {daysWithCalls.map((day) => (
        <Fragment key={day}>
          <Link
            to={`/calls/${day.replaceAll('/', '-')}`}
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
