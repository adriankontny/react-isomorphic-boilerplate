import React from 'react';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import App from './client/App';
import createPreloadedStore from './client/root/store';

let preloadedState = document.getElementById('preloaded-state').textContent;
if (preloadedState.length > 0) {
  preloadedState = JSON.parse(preloadedState);
}

const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
    type: 'light',
  },
});
const generateClassName = createGenerateClassName();
const store = createPreloadedStore(preloadedState);

hydrate(
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </MuiThemeProvider>
  </JssProvider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
