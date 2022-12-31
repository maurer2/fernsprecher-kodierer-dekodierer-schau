import React, {
  ReactElement, FC, useEffect, useMemo, RefObject, useCallback, useRef,
} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

import * as Types from './Navigation.types';
import * as Styles from './Navigation.css';

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
    const previous: string | null = (currentDayIndex !== -1 && daysWithCalls?.[currentDayIndex - 1]?.iso) || null;
    const next: string | null = (currentDayIndex !== -1 && daysWithCalls?.[currentDayIndex + 1]?.iso) || null;

    return [previous, next];
  }, [daysWithCalls, currentDay]);

  const goToNewDate = (newDate: Types.DateNavigationValues) => (): void => {
    if (newDate === Types.dateNavigation.nextDate && nextDate) {
      navigate(`/calls/${nextDate}`);
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
    <nav
      className={Styles.Navigation}
      ref={navigationElement}
      data-testid="navigation"
    >
      <ul
        className={Styles.LinkList}
        data-testid="navigation-list"
      >
        {daysWithCalls.map((day, index) => (
          <li
            className={Styles.LinkListEntry}
            key={day.iso}
          >
            <NavLink
              className={day.iso === currentDay
                ? Styles.Link.LinkActive
                : Styles.Link.LinkDefault}
              to={`/calls/${day.iso}`}
              ref={linkElements[index]}
              data-testid="navigation-list-link"
            >
              {day.user}
            </NavLink>
          </li>
        ))}
      </ul>
      <button
        className={Styles.NavButton}
        type="button"
        onClick={goToNewDate(Types.dateNavigation.previousDate)}
        disabled={!previousDate}
        data-testid="navigation-nav-button"
      >
        &lsaquo;
        <span className="visually-hidden">Previous date</span>
      </button>
      <button
        className={Styles.NavButton}
        type="button"
        onClick={goToNewDate(Types.dateNavigation.nextDate)}
        disabled={!nextDate}
        data-testid="navigation-nav-button"
      >
        &rsaquo;
        <span className="visually-hidden">Next date</span>
      </button>
    </nav>
  );
};

export default Navigation;
