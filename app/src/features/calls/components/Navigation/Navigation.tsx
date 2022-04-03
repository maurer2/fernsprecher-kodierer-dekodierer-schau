import { ReactElement, VFC } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import CSS from 'csstype';

import * as Types from './Navigation.types';

const Navigation: VFC<Readonly<Types.NavigationProps>> = ({ daysWithCalls }): ReactElement => {
  const { day = '' } = useParams();

  const activeStyles: CSS.Properties = {
    background: '#00e',
    color: '#fff',
    borderColor: '#00e',
  };

  return (
    <nav className="nav">
      {daysWithCalls.map((dayEntry) => (
        <NavLink
          key={dayEntry}
          to={`/calls/${dayEntry}`}
          className="nav-link"
          style={dayEntry === day ? activeStyles : {}}
        >
          {dayEntry}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
