import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import debug from 'debug';
import qs from 'qs';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { values } from 'lodash';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider'
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { grey, blueGrey } from '@material-ui/core/colors';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfigDev from './webpack.config.dev';
import routes from './server/routes';
import App from './client/App';
import createPreloadedStore, { createPreloadedState } from './client/root/store';

const app = express();
const logger = debug('server.js');

if (process.env.NODE_ENV === 'development') { // eslint-disable-next-line no-console
  logger(`process.env is '${process.env.NODE_ENV}', connecting webpack middlewares.`);
  const compiler = webpack(webpackConfigDev);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfigDev.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
} else { // eslint-disable-next-line no-console
  logger(`process.env is '${process.env.NODE_ENV}', using client bundle created with 'npm run build'.`);
}

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(compression());
app.use((req, res, next) => {
  res.react = (preloadedState) => {
    const sheetsRegistry = new SheetsRegistry();
    const sheetsManager = new Map();
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      palette: {
        primary: grey,
        accent: blueGrey,
        type: 'light',
      },
    });
    const generateClassName = createGenerateClassName();
    const store = createPreloadedStore(preloadedState);
    const context = {};
    /* eslint-disable */
    const staticContent = renderToString(
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <ReduxProvider store={store}>
            <Router location={req.originalUrl} context={context}>
              <App />
            </Router>
          </ReduxProvider>
        </MuiThemeProvider>
      </JssProvider>
    );
    res.status(context.statusCode || 200).render('index.ejs', {
      lang: "en",
      title: "React-Redux",
      css: sheetsRegistry.toString(),
      staticContent,
      bundle: values(require('./prod/webpack-assets.json'), value => value).map(object => object.js),
      preloadedState: JSON.stringify(preloadedState),
    });
    /* eslint-enable */
  };
  next();
});

app.use(morgan('combined'));

app.use(express.static('dist'));

// app.use('/', routes);

app.get('/*', (req, res) => {
  const location = {
    search: `?${qs.stringify({ ...req.query }, { encode: false })}`,
  };
  res.react(createPreloadedState(location));
});

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), () => { // eslint-disable-next-line no-console
  console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl-C to terminate.`);
});
