import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import App from './client/App';
import createPreloadedStore from './client/root/store';

let preloadedState = document.getElementById('preloaded-state').textContent;
if (preloadedState.length > 0) {
  preloadedState = JSON.parse(preloadedState);
}

const theme = createMuiTheme({
  palette: {
    primary: blue,
    accent: red,
    type: 'light',
  },
});
const generateClassName = createGenerateClassName();
const store = createPreloadedStore(preloadedState);

const renderApp = () => {
  hydrate(
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <Router>
            <App />
          </Router>
        </ReduxProvider>
      </MuiThemeProvider>
    </JssProvider>,
    document.getElementById('root'),
  );
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept(['./client/App'], renderApp);
}

renderApp();
