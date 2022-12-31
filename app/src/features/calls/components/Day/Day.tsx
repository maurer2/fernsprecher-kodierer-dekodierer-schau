import type { FC } from 'react';
import useCallStatistics from '../../hooks/useCallStatistics';

import PieChart from '../PieChart';
import Statistics from '../Statistics';
import Entries from '../Entries';

import type * as Types from './Day.types';
import * as Styles from './Day.css';

const Day: FC<Readonly<Types.DayProps>> = ({ callsForCurrentDay }) => {
  const receiveCodecs = callsForCurrentDay.map((entry) => entry.codecs.receive);
  const sendCodecs = callsForCurrentDay.map((entry) => entry.codecs.send);

  const [numberOfReceiveCodecs, statisticsReceiveCodecs] = useCallStatistics(receiveCodecs);
  const [numberOfSendCodecs, statisticsSendCodecs] = useCallStatistics(sendCodecs);

  return (
    <>
      <h3 className={Styles.DaySectionColumn}>Codecs statistics</h3>

      <section className={Styles.DaySection}>
        <div className={Styles.DaySectionColumn}>
          <h4 className={Styles.DaySectionSubtitle}>Receive</h4>
        </div>
        <div className={Styles.DaySectionColumn}>
          <h4 className={Styles.DaySectionSubtitle}>Send</h4>
        </div>
      </section>

      <section className={Styles.DaySection}>
        <div className={Styles.DaySectionColumn}>
          <Statistics codecStatistics={statisticsReceiveCodecs} />
        </div>
        <div className={Styles.DaySectionColumn}>
          <Statistics codecStatistics={statisticsSendCodecs} />
        </div>
      </section>

      <h3 className={Styles.DaySectionTitle}>Pie chart</h3>
      <section className={Styles.DaySection}>
        <div className={Styles.DaySectionColumn}>
          <PieChart
            numberOfCodecs={numberOfReceiveCodecs}
            codecStatistics={statisticsReceiveCodecs}
          />
        </div>
        <div className={Styles.DaySectionColumn}>
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
