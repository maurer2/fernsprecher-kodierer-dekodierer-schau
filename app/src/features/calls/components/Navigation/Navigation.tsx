import React, {
  ReactElement,
  FC,
  useEffect,
  useMemo,
  RefObject,
  useCallback,
  useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';

import * as Types from './Navigation.types';
import * as Styles from './Navigation.styles';

const Navigation: FC<Readonly<Types.NavigationProps>> = ({
  daysWithCalls,
  currentDay,
}): ReactElement => {
  const navigate = useNavigate();
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

  const goToNewDate = (newDate: Types.DateNavigationValues) => (): void => {
    if (newDate === Types.dateNavigation.nextDate && nextDate) {
      navigate(`/calls/${nextDate}`);
      return;
    }

    if (newDate === Types.dateNavigation.previousDate && previousDate) {
      navigate(`/calls/${previousDate}`);
    }
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
        onClick={goToNewDate(Types.dateNavigation.previousDate)}
        disabled={!previousDate}
      >
        &lsaquo;
        <span className="visually-hidden">Previous date</span>
      </Styles.NavButton>
      <Styles.NavButton
        type="button"
        onClick={goToNewDate(Types.dateNavigation.nextDate)}
        disabled={!nextDate}
      >
        &rsaquo;
        <span className="visually-hidden">Previous date</span>
      </Styles.NavButton>
    </Styles.Navigation>
  );
};

export default Navigation;
