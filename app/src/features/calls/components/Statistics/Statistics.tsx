import type { FC } from 'react';
import { Fragment } from 'react';
import { codecs } from '../../store/calls.types';

import type * as Types from './Statistics.types';
import * as Styles from './Statistics.css';

const Statistics: FC<Readonly<Types.StatisticsProps>> = ({ codecStatistics }) => {
  const numberOfDigits: Types.DigitsCounts = codecStatistics.reduce(
    (total, current) => {
      const countDigits = current[2].toString().length;
      total.count = total.count.concat(countDigits);

      return total;
    },
    {
      percentage: [] as Types.DigitsCounts['percentage'],
      count: [] as Types.DigitsCounts['count'],
    },
  );
  const numberOfEntriesTotal = codecStatistics.reduce((total, current) => total + current[2], 0);
  const numberOfDigitsForCount = Math.max(...numberOfDigits.count);

  if (!codecStatistics.length) {
    return null;
  }

  return (
    <table className={Styles.Table}>
      <thead className={Styles.IgnoredTableElement}>
        <tr className={Styles.IgnoredTableElement}>
          <th className={Styles.TableCellHead}>Name</th>
          <th className={Styles.TableCellHead}>Percentage</th>
          <th className={Styles.TableCellHead}>Count</th>
          <th className={Styles.TableCellHead}>Colour</th>
        </tr>
      </thead>
      <tbody className={Styles.IgnoredTableElement}>
        {codecStatistics.map(([name, percentage, count]) => (
          <Fragment key={name}>
            <tr className={Styles.IgnoredTableElement}>
              <td className={Styles.TableCellBody}>{name}</td>
              <td className={Styles.TableCellBody}>
                {percentage.toFixed(2)}
                %
              </td>
              <td className={Styles.TableCellBody}>
                {String(count).padStart(numberOfDigitsForCount, '0')}
              </td>
              <td className={Styles.TableCellBody}>
                <span className={Styles.ColourIndicator[codecs[name]]}>
                  <span className="visually-hidden">{name}</span>
                </span>
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
      <tfoot className={Styles.IgnoredTableElement}>
        <tr className={Styles.IgnoredTableElement}>
          <td
            className={Styles.TableCellFoot}
            colSpan={2}
          >
            Total
          </td>
          <td className={Styles.TableCellFoot}>{numberOfEntriesTotal}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Statistics;
