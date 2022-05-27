import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Calls from './features/calls';

import 'modern-normalize';

import { GlobalStyles } from './global.styles';

import * as Styles from './App.styles';

const App = () => {
  GlobalStyles();

  return (
    <Styles.Wrapper>
      <Router>
        <Routes>
          <Route
            path="/calls/:day"
            element={<Calls />}
          />
          <Route
            path="*"
            element={<Calls />}
          />
        </Routes>
      </Router>
    </Styles.Wrapper>
  );
};

export default App;
