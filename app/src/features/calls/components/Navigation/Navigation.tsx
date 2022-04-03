import { ReactElement, VFC } from 'react';
import { NavLink } from 'react-router-dom';
import CSS from 'csstype';

import * as Types from './Navigation.types';

const Navigation: VFC<Readonly<Types.NavigationProps>> = ({ daysWithCalls, currentDay }): ReactElement => {
  const activeStyles: CSS.Properties = {
    background: '#00e',
    color: '#fff',
    borderColor: '#00e',
  };

  return (
    <nav className="nav">
      {daysWithCalls.map((day) => (
        <NavLink
          key={day}
          to={`/calls/${day}`}
          className="nav-link"
          style={day === currentDay ? activeStyles : {}}
        >
          {day}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
