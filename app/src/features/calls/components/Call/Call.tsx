import React, { Fragment, VFC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useCallListGroupedByDate from '../../hooks/useCallListGroupedByDate';
import useCallStatistics from '../../hooks/useCallStatistics/useCallStatistics';

import * as Types from './Call.types';

const Call: VFC<Readonly<Types.CallProps>> = ({ calls }) => {
  const { day = '' } = useParams();
  const dayFormatted = day.replaceAll('-', '/');

  const [groupedCallList] = useCallListGroupedByDate(calls);
  const entriesForDay = useMemo(
    () => groupedCallList[dayFormatted] ?? [],
    [dayFormatted, groupedCallList]
  );
  const receiveCodecs = useMemo(
    () => entriesForDay.map((entry) => entry.codecs.receive),
    [entriesForDay]
  );

  const [numberOfCodecs, _, codecStatisticRelative] = useCallStatistics(receiveCodecs);

  const colours = ['red', 'green', 'blue', 'yellow', 'orange', 'deeppink'];
  const gradientSections = codecStatisticRelative.reduce(
    (total, current, index) => {
      const colour = colours[index]; // todo wrap around
      const endValue = total.startValue + current[1];

      const section = `${colour} ${total.startValue.toFixed(5)}% ${endValue.toFixed(5)}%`;

      const newTotal = {
        startValue: total.startValue + current[1],
        sections: total.sections.concat(section),
      };

      return newTotal;
    },
    {
      startValue: 0,
      sections: [] as string[],
    }
  );

  const gradientsSectionsString = gradientSections.sections.join(', ');

  const pieChartStyle = {
    width: '250px',
    height: '250px',
    background: `conic-gradient(${gradientsSectionsString})`,
    borderRadius: '50%',
  };

  return (
    <div className="container">
      <h2>Codecs statistics</h2>
      <dl>
        {codecStatisticRelative.map(([key, value], index) => (
          <Fragment key={key}>
            <dt>{key}:</dt>
            <dt>
              <span>{value.toFixed(2)}%</span>
              <span
                style={{
                  display: 'inline-block',
                  marginLeft: '1rem',
                  width: '1ch',
                  height: '1ch',
                  background: `${colours[index]}`,
                }}
              ></span>
            </dt>
          </Fragment>
        ))}
      </dl>
      <h2>Pie chart</h2>
      <div className="pie-chart" style={pieChartStyle} />
      <h2>{numberOfCodecs} entries for the day</h2>
      <code>
        {Boolean(entriesForDay) &&
          entriesForDay.map((group, index) => (
            <Fragment key={index}>
              <pre>{JSON.stringify(group, null, 4)}</pre>
            </Fragment>
          ))}
      </code>
    </div>
  );
};

export default Call;
