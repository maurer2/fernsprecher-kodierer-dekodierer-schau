import React, { FC } from 'react';
import useCallStatistics from '../../hooks/useCallStatistics';

import PieChart from '../PieChart';
import Statistics from '../Statistics';
import Entries from '../Entries';

import * as Types from './Day.types';
import * as Styles from './Day.styles';

const Day: FC<Readonly<Types.DayProps>> = ({ callsForCurrentDay }) => {
  const receiveCodecs = callsForCurrentDay.map((entry) => entry.codecs.receive);
  const sendCodecs = callsForCurrentDay.map((entry) => entry.codecs.send);

  const [numberOfReceiveCodecs, statisticsReceiveCodecs] = useCallStatistics(receiveCodecs);
  const [numberOfSendCodecs, statisticsSendCodecs] = useCallStatistics(sendCodecs);

  return (
    <>
      <Styles.DaySectionTitle>Codecs statistics</Styles.DaySectionTitle>
      <Styles.DaySection>
        <Styles.DaySectionColumn>
          <Styles.DaySectionSubtitle>Receive</Styles.DaySectionSubtitle>
        </Styles.DaySectionColumn>
        <Styles.DaySectionColumn>
          <Styles.DaySectionSubtitle>Send</Styles.DaySectionSubtitle>
        </Styles.DaySectionColumn>
      </Styles.DaySection>
      <Styles.DaySection>
        <Styles.DaySectionColumn>
          <Statistics codecStatistics={statisticsReceiveCodecs} />
        </Styles.DaySectionColumn>
        <Styles.DaySectionColumn>
          <Statistics codecStatistics={statisticsSendCodecs} />
        </Styles.DaySectionColumn>
      </Styles.DaySection>
      <Styles.DaySectionTitle>Pie chart</Styles.DaySectionTitle>
      <Styles.DaySection>
        <Styles.DaySectionColumn>
          <PieChart
            numberOfCodecs={numberOfReceiveCodecs}
            codecStatistics={statisticsReceiveCodecs}
          />
        </Styles.DaySectionColumn>
        <Styles.DaySectionColumn>
          <PieChart
            numberOfCodecs={numberOfSendCodecs}
            codecStatistics={statisticsSendCodecs}
          />
        </Styles.DaySectionColumn>
      </Styles.DaySection>
      <Entries entriesForDay={callsForCurrentDay} />
    </>
  );
};

export default Day;
