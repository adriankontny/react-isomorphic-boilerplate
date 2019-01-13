import express from 'express';
import morgan from 'morgan';
import debug from 'debug';
import React from 'react';
import { Provider } from 'react-redux';
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
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfigDev from './webpack.config.dev';
import routes from './server/routes';
import App from './client/App';
import createPreloadedStore from './client/root/store';

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
app.use((req, res, next) => {
  res.react = (preloadedState) => {
    const sheetsRegistry = new SheetsRegistry();
    const sheetsManager = new Map();
    const theme = createMuiTheme({
      palette: {
        primary: green,
        accent: red,
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
          <Provider store={store}>
            <Router location={req.originalUrl} context={context}>
              <App />
            </Router>
          </Provider>
        </MuiThemeProvider>
      </JssProvider>
    );
    const status = context.statusCode || 200;
    const css = sheetsRegistry.toString();
    res.status(status).render('index.ejs', {
      css,
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

app.use('/', routes);

app.get('/*', (req, res) => {
  const preloadedState = {};
  res.react(preloadedState);
});

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), () => { // eslint-disable-next-line no-console
  console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl-C to terminate.`);
});
