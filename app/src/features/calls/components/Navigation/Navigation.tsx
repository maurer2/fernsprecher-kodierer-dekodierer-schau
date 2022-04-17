import { ReactElement, FC } from 'react';

import * as Types from './Navigation.types';
import * as Styles from './Navigation.styles';

const Navigation: FC<Readonly<Types.NavigationProps>> = ({
  daysWithCalls,
  currentDay,
}): ReactElement => (
  <Styles.Nav>
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
  </Styles.Nav>
);

export default Navigation;
