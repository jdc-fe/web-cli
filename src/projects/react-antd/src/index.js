import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'mobx-react';
import App from './views';
import store from './store';

ReactDom.render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
