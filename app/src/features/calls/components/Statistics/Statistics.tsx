import React, { FC, Fragment } from 'react';
import { codecsValues } from '../../store/calls.types';

import * as Types from './Statistics.types';
import * as Styles from './Statistics.styles';

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
    <Styles.Table>
      <Styles.IgnoredTableElement as="thead">
        <Styles.IgnoredTableElement as="tr">
          <Styles.TableCellHead as="th">Name</Styles.TableCellHead>
          <Styles.TableCellHead as="th">Percentage</Styles.TableCellHead>
          <Styles.TableCellHead as="th">Count</Styles.TableCellHead>
          <Styles.TableCellHead as="th">Colour</Styles.TableCellHead>
        </Styles.IgnoredTableElement>
      </Styles.IgnoredTableElement>
      <Styles.IgnoredTableElement as="tbody">
        {codecStatistics.map(([name, percentage, count]) => (
          <Fragment key={name}>
            <Styles.IgnoredTableElement as="tr">
              <Styles.TableCell>{name}</Styles.TableCell>
              <Styles.TableCell>
                {percentage.toFixed(2)}
                %
              </Styles.TableCell>
              <Styles.TableCell>
                {String(count).padStart(numberOfDigitsForCount, '0')}
              </Styles.TableCell>
              <Styles.TableCell>
                <Styles.ColourIndicator codec={codecsValues[name]}>
                  <span className="visually-hidden">{name}</span>
                </Styles.ColourIndicator>
              </Styles.TableCell>
            </Styles.IgnoredTableElement>
          </Fragment>
        ))}
      </Styles.IgnoredTableElement>
      <Styles.IgnoredTableElement as="tfoot">
        <Styles.IgnoredTableElement as="tr">
          <Styles.TableCellFoot colSpan={2}>Total</Styles.TableCellFoot>
          <Styles.TableCellFoot>{numberOfEntriesTotal}</Styles.TableCellFoot>
          <Styles.TableCellFoot />
        </Styles.IgnoredTableElement>
      </Styles.IgnoredTableElement>
    </Styles.Table>
  );
};

export default Statistics;
