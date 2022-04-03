import React, { VFC, useMemo } from 'react';
import useCallStatistics from '../../hooks/useCallStatistics';

import PieChart from '../PieChart';
import Statistics from '../Statistics';
import Entries from '../Entries';

import * as Types from './Day.types';

const Day: VFC<Readonly<Types.DayProps>> = ({ callsForCurrentDay }) => {
  const receiveCodecsForDay = useMemo(
    () => callsForCurrentDay.map((entry) => entry.codecs.receive),
    [callsForCurrentDay]
  );
  const [numberOfCodecs, codecsStatistics] = useCallStatistics(receiveCodecsForDay);

  return (
    <div className="container">
      <section>
        <h2>Codecs statistics</h2>
        <Statistics codecStatistics={codecsStatistics} />
      </section>
      <section>
        <h2>Pie chart</h2>
        <PieChart
          numberOfCodecs={numberOfCodecs}
          codecStatistics={codecsStatistics}
        />
      </section>
      <section>
        <h2>Entries for the day</h2>
        <Entries entriesForDay={callsForCurrentDay} />
      </section>
    </div>
  );
};

export default Day;
