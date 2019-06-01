import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  createMuiTheme,
} from '@material-ui/core/styles';
import {
  ThemeProvider,
} from '@material-ui/styles';
import { blue, red } from '@material-ui/core/colors';
import App from './client/App';
import createPreloadedStore from './client/root/store';

let preloadedState = document.getElementById('preloaded-state').textContent;
if (preloadedState.length > 0) {
  preloadedState = JSON.parse(preloadedState);
}

const store = createPreloadedStore(preloadedState);
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: blue,
    accent: red,
    type: 'light',
  },
});

const renderApp = () => {
  hydrate(
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <Router>
            <App />
          </Router>
        </ReduxProvider>
      </ThemeProvider>,
    document.getElementById('root'),
  );
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept(['./client/App'], renderApp);
}

renderApp();
