import React, { VFC } from 'react';
import useCallStatistics from '../../hooks/useCallStatistics';

import PieChart from '../PieChart';
import Statistics from '../Statistics';
import Entries from '../Entries';

import * as Types from './Day.types';

const Day: VFC<Readonly<Types.DayProps>> = ({ callsForCurrentDay }) => {
  const receiveCodecs = callsForCurrentDay.map((entry) => entry.codecs.receive);
  const sendCodecs = callsForCurrentDay.map((entry) => entry.codecs.send);

  const [numberOfReceiveCodecs, statisticsReceiveCodecs] = useCallStatistics(receiveCodecs);
  const [numberOfSendCodecs, statisticsSendCodecs] = useCallStatistics(sendCodecs);

  return (
    <div className="container">
      <section className="pure-g">
        <h2 className="pure-u-1-1">Codecs statistics</h2>
        <div className="pure-u-1-2">
          <h3>Receive</h3>
          <Statistics codecStatistics={statisticsReceiveCodecs} />
        </div>
        <div className="pure-u-1-2">
          <h3>Send</h3>
          <Statistics codecStatistics={statisticsSendCodecs} />
        </div>
      </section>
      <section>
        <h2 className="pure-u-1-1">Pie charts</h2>
        <div className="pure-u-1-2">
          <h3>Receive</h3>
          <PieChart
            numberOfCodecs={numberOfReceiveCodecs}
            codecStatistics={statisticsReceiveCodecs}
          />
        </div>
        <div className="pure-u-1-2">
          <h3>Send</h3>
          <PieChart
            numberOfCodecs={numberOfSendCodecs}
            codecStatistics={statisticsSendCodecs}
          />
        </div>
      </section>
      <section>
        <h2 className="pure-u-1-1">Entries</h2>
        <div className="pure-u-1-1">
          <Entries entriesForDay={callsForCurrentDay} />
        </div>
      </section>
    </div>
  );
};

export default Day;
