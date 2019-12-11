import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'mobx-react';
import { DEBUG } from 'src/config';
import App from './views';
import store from './store';

if (DEBUG) import('./mock');

ReactDom.render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
