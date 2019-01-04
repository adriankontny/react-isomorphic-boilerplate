import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './client/App';
import reducers from './client/reducers';

let preloadedState = document.getElementById('preloaded-state').textContent;

if (preloadedState.length > 0) {
  preloadedState = JSON.parse(preloadedState);
}

hydrate(
  <Provider store={createStore(reducers, preloadedState)}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
