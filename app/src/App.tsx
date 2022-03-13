import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Calls from './features/calls';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/:day' element={<Calls />}/>
          <Route
            path="*"
            element={<Calls />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
