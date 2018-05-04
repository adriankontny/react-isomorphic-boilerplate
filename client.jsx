import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './client/App';

let initialData = document.getElementById('initial-data').textContent;

if (initialData.length > 0) {
  initialData = JSON.parse(initialData);
}

hydrate(
  <Router>
    <App initialData={initialData} />
  </Router>
  , document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
