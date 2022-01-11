import React from 'react';
// import { Counter } from './features/counter/Counter';
import Calls from './features/calls/Calls';
import './App.css';
import dummyJSON from './data/dummy.json';

function App() {
  return (
    <div className="App">
      <Calls />
      <code>
        <pre>{JSON.stringify(dummyJSON, null, 2)}</pre>
      </code>
    </div>
  );
}

export default App;
