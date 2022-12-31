import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './app/store';

const rootDomElement = document.getElementById('root');
if (!rootDomElement) {
  throw Error('Root element not found');
}

const root = createRoot(rootDomElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
