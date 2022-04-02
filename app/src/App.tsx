import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Calls from './features/calls';
import Home from './features/home/index';
import './App.css';
import 'purecss';

function App() {
  return (
    <article className="App">
      <Router>
        <Routes>
        <Route
          path='/calls'
          element={<Calls />}
        />
        <Route
          path='/calls/:day'
          element={<Calls />}
        />
        <Route
          path="*"
          element={<Home />}
        />
        </Routes>
      </Router>
    </article>
  );
}

export default App;
