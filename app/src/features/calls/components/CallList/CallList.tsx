import { ReactElement, FC } from 'react';
import Day from '../Day';

import * as Types from './CallList.types';
import * as Styles from './CallList.css';

const CallList: FC<Readonly<Types.CallListProps>> = ({
  callList,
  currentDay,
}): ReactElement | null => (
  <div className={Styles.callList}>
    {currentDay
      ? <Day callsForCurrentDay={callList} />
      : null}
  </div>
);

export default CallList;
