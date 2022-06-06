/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import Component from './Navigation';
import * as Types from './Navigation.types';

class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

describe('Navigation', () => {
  const propsDefault: Types.NavigationProps = {
    daysWithCalls: [
      {
        iso: '2022-01-04',
        user: '2022/01/04',
      },
      {
        iso: '2022-05-01',
        user: '2022/05/01',
      },
      {
        iso: '2022-01-01',
        user: '2022/01/01',
      },
    ],
    currentDay: '2022-01-04',
  };

  const setup = (props?: Types.NavigationProps) => render(
    <Router>
      <Component
        {...propsDefault}
        {...props}
      />
    </Router>,
  );

  it('renders', () => {
    const { getByTestId, queryByTestId, queryAllByTestId } = setup();

    expect(getByTestId('navigation')).toBeInTheDocument();
    expect(queryByTestId('navigation-list')).toBeInTheDocument();
    expect(queryByTestId('navigation-list')).toBeInTheDocument();
    expect(queryAllByTestId('navigation-list-link')).toHaveLength(3);
    expect(queryAllByTestId('navigation-nav-button')).toHaveLength(2);
  });
});
