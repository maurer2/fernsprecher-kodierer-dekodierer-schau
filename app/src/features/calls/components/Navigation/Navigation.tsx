import { ReactElement, VFC } from 'react';

import * as Types from './Navigation.types';
import * as Styles from './Navigation.styles';

const Navigation: VFC<Readonly<Types.NavigationProps>> = ({ daysWithCalls, currentDay }): ReactElement => {


  return (
    <nav className="nav">
      {daysWithCalls.map((day) => (
        <Styles.Link
          key={day.iso}
          to={`/calls/${day.iso}`}
          className="nav-link"
          status={day.iso === currentDay ? 'active' : 'default'}
        >
          {day.user}
        </Styles.Link>
      ))}
    </nav>
  );
};

export default Navigation;
