import React, {
  ReactElement,
  FC,
  MouseEvent,
  useEffect,
  useMemo,
  RefObject,
  useCallback,
  useRef,
} from 'react';

import * as Types from './Navigation.types';
import * as Styles from './Navigation.styles';

const Navigation: FC<Readonly<Types.NavigationProps>> = ({
  daysWithCalls,
  currentDay,
}): ReactElement => {
  const NavigationElement = useRef<HTMLElement | null>(null);
  const linkElements = useMemo<RefObject<HTMLAnchorElement>[]>(
    () => Array.from({ length: daysWithCalls.length }, () => React.createRef()),
    [daysWithCalls],
  );

  function gotoPrevDay(event: MouseEvent<HTMLButtonElement>): void {}

  function gotoNextDay(event: MouseEvent<HTMLButtonElement>): void {}

  const scrollToActiveLinkElement = useCallback(() => {
    const activeLinkElement = linkElements.find((element) => element.current?.classList.contains('active'));

    activeLinkElement?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [linkElements]);

  // scroll to active link element when viewport changes
  useEffect(() => {
    let linkListRef: HTMLElement | null = null;

    const NavigationElementResizeObserver = new ResizeObserver(() => {
      scrollToActiveLinkElement();
    });

    if (NavigationElement.current) {
      NavigationElementResizeObserver.observe(NavigationElement.current);
      linkListRef = NavigationElement.current;
    }

    return () => {
      if (linkListRef) {
        NavigationElementResizeObserver.unobserve(linkListRef);
      }
    };
  }, [scrollToActiveLinkElement]);

  // scroll to active link element when current day changes
  useEffect(() => {
    if (!currentDay) {
      return;
    }

    scrollToActiveLinkElement();
  }, [currentDay, scrollToActiveLinkElement]);

  return (
    <Styles.Navigation ref={NavigationElement}>
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
