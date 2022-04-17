import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Calls from './features/calls';
import Home from './features/home/index';

import './App.css';
import 'purecss';

import * as Styles from './App.styles';

const App = () => (
  <Styles.Wrapper className="App">
    <Styles.Main>
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
    </Styles.Main>
  </Styles.Wrapper>
);

export default App;
