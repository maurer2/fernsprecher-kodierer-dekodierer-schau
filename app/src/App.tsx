import React from 'react';
import {
  BrowserRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';

import Calls from './features/calls';

import 'modern-normalize';

import { wrapper } from './App.css';
import './global.css';
import './theme.css';

const App = () => (
  <div className={wrapper}>
    <Router>
      <Routes>
        <Route
          path="/calls/:day"
          element={<Calls />}
        />
        <Route
          path="/"
          element={<Navigate replace to="/calls" />}
        />
        <Route
          path="*"
          element={<Calls />}
        />
      </Routes>
    </Router>
  </div>
);

export default App;
