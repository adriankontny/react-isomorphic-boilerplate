import React from 'react';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './client/App';
import createPreloadedStore from './client/root/store';

let preloadedState = document.getElementById('preloaded-state').textContent;

if (preloadedState.length > 0) {
  preloadedState = JSON.parse(preloadedState);
}

const store = createPreloadedStore(preloadedState);

hydrate(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
