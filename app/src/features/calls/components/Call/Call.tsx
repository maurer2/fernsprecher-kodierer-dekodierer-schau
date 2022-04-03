import React, { VFC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useCallListGroupedByDate from '../../hooks/useCallListGroupedByDate';
import useCallStatistics from '../../hooks/useCallStatistics/useCallStatistics';

import PieChart from '../PieChart';
import Statistics from '../Statistics';
import Entries from '../Entries';

import * as Types from './Call.types';

const Call: VFC<Readonly<Types.CallProps>> = ({ calls }) => {
  const { day = '' } = useParams();
  const [groupedCallList] = useCallListGroupedByDate(calls);
  const entriesForDay = useMemo(() => groupedCallList[day] ?? [], [groupedCallList, day]);
  const receiveCodecsForDay = useMemo(() => entriesForDay.map((entry) => entry.codecs.receive), [entriesForDay]);
  const [numberOfCodecs, codecsStatistics] = useCallStatistics(receiveCodecsForDay);

  return (
    <div className="container">
      <section>
        <h2>Codecs statistics</h2>
        <Statistics codecStatistics={codecsStatistics} />
      </section>
      <section>
        <h2>Pie chart</h2>
        <PieChart numberOfCodecs={numberOfCodecs} codecStatistics={codecsStatistics} />
      </section>
      <section>
        <h2>Entries for the day</h2>
        <Entries entriesForDay={entriesForDay} />
      </section>
    </div>
  );
};

export default Call;
