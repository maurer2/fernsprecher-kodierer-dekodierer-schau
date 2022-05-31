import { ReactElement, FC } from 'react';
import Day from '../Day';

import * as Types from './CallList.types';
import * as Styles from './CallList.styles';

const CallList: FC<Readonly<Types.CallListProps>> = ({
  callList,
  currentDay,
}): ReactElement | null => (
  <Styles.CallList>
    {currentDay
      ? <Day callsForCurrentDay={callList} />
      : null}
  </Styles.CallList>
);

export default CallList;
