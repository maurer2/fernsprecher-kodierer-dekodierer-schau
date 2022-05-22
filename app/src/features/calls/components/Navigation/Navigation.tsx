import React, {
  ReactElement, FC, MouseEvent, useEffect, useMemo, RefObject, useCallback,
} from 'react';

import * as Types from './Navigation.types';
import * as Styles from './Navigation.styles';

const Navigation: FC<Readonly<Types.NavigationProps>> = ({
  daysWithCalls,
  currentDay,
}): ReactElement => {
  const linkElements = useMemo<RefObject<HTMLAnchorElement>[]>(
    () => Array.from({ length: daysWithCalls.length }, () => React.createRef()),
    [daysWithCalls],
  );

  function gotoPrevDay(event: MouseEvent<HTMLButtonElement>): void {}

  function gotoNextDay(event: MouseEvent<HTMLButtonElement>): void {}

  const scrollToDay = useCallback((domElement: RefObject<HTMLElement>) => {
    domElement.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, []);

  useEffect(() => {
    const activeLinkElement = linkElements.find((element) => element.current?.classList.contains('active'));

    if (!currentDay || !activeLinkElement?.current) {
      return;
    }

    scrollToDay(activeLinkElement);
  }, [currentDay, linkElements, scrollToDay]);

  return (
    <Styles.Navigation>
      <Styles.LinkList>
        {daysWithCalls.map((day, index) => (
          <Styles.LinkListEntry key={day.iso}>
            <Styles.Link
              to={`/calls/${day.iso}`}
              status={day.iso === currentDay ? 'active' : 'default'}
              ref={linkElements[index]}
            >
              {day.user}
            </Styles.Link>
          </Styles.LinkListEntry>
        ))}
      </Styles.LinkList>
      <Styles.NavButton
        type="button"
        onClick={(event: MouseEvent<HTMLButtonElement>) => gotoPrevDay(event)}
        disabled
      >
        Previous day
      </Styles.NavButton>
      <Styles.NavButton
        type="button"
        onClick={(event: MouseEvent<HTMLButtonElement>) => gotoNextDay(event)}
        disabled
      >
        Next day
      </Styles.NavButton>
    </Styles.Navigation>
  );
};

export default Navigation;
