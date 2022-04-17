import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './app/store';

import './index.css';

const rootDomElement = document.getElementById('root');
if (!rootDomElement) {
  throw Error('Root element not found');
}

const root = createRoot(rootDomElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
