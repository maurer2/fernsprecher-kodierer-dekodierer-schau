import React, { FC } from 'react';
import useCallStatistics from '../../hooks/useCallStatistics';

import PieChart from '../PieChart';
import Statistics from '../Statistics';
import Entries from '../Entries';

import * as Types from './Day.types';
import * as Styles from './Day.css';

const Day: FC<Readonly<Types.DayProps>> = ({ callsForCurrentDay }) => {
  const receiveCodecs = callsForCurrentDay.map((entry) => entry.codecs.receive);
  const sendCodecs = callsForCurrentDay.map((entry) => entry.codecs.send);

  const [numberOfReceiveCodecs, statisticsReceiveCodecs] = useCallStatistics(receiveCodecs);
  const [numberOfSendCodecs, statisticsSendCodecs] = useCallStatistics(sendCodecs);

  return (
    <>
      <h3 className={Styles.daySectionColumn}>Codecs statistics</h3>

      <section className={Styles.daySection}>
        <div className={Styles.daySectionColumn}>
          <h4 className={Styles.daySectionSubtitle}>Receive</h4>
        </div>
        <div className={Styles.daySectionColumn}>
          <h4 className={Styles.daySectionSubtitle}>Send</h4>
        </div>
      </section>

      <section className={Styles.daySection}>
        <div className={Styles.daySectionColumn}>
          <Statistics codecStatistics={statisticsReceiveCodecs} />
        </div>
        <div className={Styles.daySectionColumn}>
          <Statistics codecStatistics={statisticsSendCodecs} />
        </div>
      </section>

      <h3 className={Styles.daySectionTitle}>Pie chart</h3>
      <section className={Styles.daySection}>
        <div className={Styles.daySectionColumn}>
          <PieChart
            numberOfCodecs={numberOfReceiveCodecs}
            codecStatistics={statisticsReceiveCodecs}
          />
        </div>
        <div className={Styles.daySectionColumn}>
          <PieChart
            numberOfCodecs={numberOfSendCodecs}
            codecStatistics={statisticsSendCodecs}
          />
        </div>
      </section>

      <Entries entriesForDay={callsForCurrentDay} />
    </>
  );
};

export default Day;
