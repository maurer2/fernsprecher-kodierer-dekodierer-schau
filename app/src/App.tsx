import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Calls from './features/calls';
import Home from './features/home/index';

import 'purecss';
import { GlobalStyles } from './global.styles';

import * as Styles from './App.styles';

const App = () => {
  GlobalStyles();

  return (
    <Styles.Wrapper className="App">
      <Router>
        <Routes>
          <Route
            path="/calls"
            element={<Calls />}
          />
          <Route
            path="/calls/:day"
            element={<Calls />}
          />
          <Route
            path="*"
            element={<Home />}
          />
        </Routes>
      </Router>
    </Styles.Wrapper>
  );
};

export default App;
