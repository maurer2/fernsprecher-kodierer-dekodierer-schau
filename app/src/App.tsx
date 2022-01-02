import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import dummyJSON from './data/dummy.json';

function App() {
  return (
    <div className="App">
      <Counter />
      <code>
        <pre>{JSON.stringify(dummyJSON, null, 2)}</pre>
      </code>
    </div>
  );
}

export default App;
