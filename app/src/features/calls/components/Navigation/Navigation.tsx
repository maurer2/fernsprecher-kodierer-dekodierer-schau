import React, {
  ReactElement,
  FC,
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
  const navigationElement = useRef<HTMLElement | null>(null);
  const linkElements = useMemo<RefObject<HTMLAnchorElement>[]>(
    () => Array.from({ length: daysWithCalls.length }, () => React.createRef()),
    [daysWithCalls],
  );

  const [previousDate, nextDate] = useMemo(() => {
    const currentDayIndex = daysWithCalls.findIndex((day) => day.iso === currentDay);
    const previous: string | null = (currentDayIndex !== -1
      && daysWithCalls?.[currentDayIndex - 1]?.iso) || null;
    const next: string | null = (currentDayIndex !== -1
      && daysWithCalls?.[currentDayIndex + 1]?.iso) || null;

    return [previous, next];
  }, [daysWithCalls, currentDay]);

  const goToNewDate = (newDate: Types.DateNavigation) => (): void => {
    if (newDate === 'next-date') {
      console.log('next-date');
      return;
    }

    console.log('previous-date');
  };

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

    if (navigationElement.current) {
      NavigationElementResizeObserver.observe(navigationElement.current);
      linkListRef = navigationElement.current;
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
    <Styles.Navigation ref={navigationElement}>
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
        onClick={goToNewDate('previous-date')}
        disabled={!previousDate}
      >
        Previous date
      </Styles.NavButton>
      <Styles.NavButton
        type="button"
        onClick={goToNewDate('next-date')}
        disabled={!nextDate}
      >
        Next date
      </Styles.NavButton>
    </Styles.Navigation>
  );
};

export default Navigation;
