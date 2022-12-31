import type { ReactElement, FC } from 'react';
import Day from '../Day';

import type * as Types from './CallList.types';
import * as Styles from './CallList.css';

const CallList: FC<Readonly<Types.CallListProps>> = ({
  callList,
  currentDay,
}): ReactElement | null => (
  <div className={Styles.CallList}>
    {currentDay
      ? <Day callsForCurrentDay={callList} />
      : null}
  </div>
);

export default CallList;
