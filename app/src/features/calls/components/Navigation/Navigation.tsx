import { ReactElement, FC, MouseEvent } from 'react';

import * as Types from './Navigation.types';
import * as Styles from './Navigation.styles';

const Navigation: FC<Readonly<Types.NavigationProps>> = ({
  daysWithCalls,
  currentDay,
}): ReactElement => {
  function gotoPrevDay(event: MouseEvent<HTMLButtonElement>): void {}

  function gotoNextDay(event: MouseEvent<HTMLButtonElement>): void {}

  return (
    <Styles.Navigation>
      <Styles.LinkList>
        {daysWithCalls.map((day) => (
          <Styles.LinkListEntry>
            <Styles.Link
              key={day.iso}
              to={`/calls/${day.iso}`}
              className="nav-link"
              status={day.iso === currentDay ? 'active' : 'default'}
            >
              {day.user}
            </Styles.Link>
          </Styles.LinkListEntry>
        ))}
      </Styles.LinkList>
      <Styles.NavButton
        type="button"
        onClick={(event: MouseEvent<HTMLButtonElement>) => gotoPrevDay(event)}
      >
        Previous day
      </Styles.NavButton>
      <Styles.NavButton
        type="button"
        onClick={(event: MouseEvent<HTMLButtonElement>) => gotoPrevDay(event)}
      >
        Next day
      </Styles.NavButton>
    </Styles.Navigation>
  );
};

export default Navigation;
