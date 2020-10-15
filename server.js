/* eslint-disable no-console */
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import debug from 'debug';
import qs from 'qs';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import values from 'lodash/values';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import {
  createMuiTheme,
} from '@material-ui/core/styles';
import {
  ServerStyleSheets,
  ThemeProvider,
} from '@material-ui/styles';
import { grey, blueGrey } from '@material-ui/core/colors';
import expressStatusMonitor from 'express-status-monitor';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfigDev from './webpack.config.dev';
// import routes from './server/routes';
import App from './client/App';
import createPreloadedStore, { createPreloadedState } from './client/root/store';

const app = express();
const logger = debug('server.js');

if (process.env.NODE_ENV === 'development') {
  logger(`process.env is '${process.env.NODE_ENV}', connecting webpack middlewares.`);
  const compiler = webpack(webpackConfigDev);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfigDev.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
  app.use(expressStatusMonitor());
} else {
  logger(`process.env is '${process.env.NODE_ENV}', using client bundle created with 'npm run build'.`);
}

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

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(compression());
app.use(async (req, res, next) => {
  res.react = (preloadedState) => {
    const sheets = new ServerStyleSheets();
    const store = createPreloadedStore(preloadedState);
    const context = {};
    /* eslint-disable */
    const staticContent = renderToString(
      sheets.collect(
        <ThemeProvider theme={theme}>
          <ReduxProvider store={store}>
            <Router location={req.originalUrl} context={context}>
              <App />
            </Router>
          </ReduxProvider>
        </ThemeProvider>
      )
    );
    res.status(context.statusCode || 200).render('index.ejs', {
      lang: "en",
      title: "React-Redux",
      css: sheets.toString(),
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

const getData = (query) => {
  const page = query.page || query.since || query.until || 0;
  const image = ((page / 2) % 20 === 0) || ((((+page - 1) / 2) % 20) === 0) ? './audi1.png' : './audi2.png';
  const result = {
    img: image,
    title: 'Image',
    author: 'author',
    featured: false,
  };
  const data = {
    results: [],
  };
  if (query.until) {
    for (let i = 0; i < 20; i += 1) {
      data.results.unshift({
        ...result,
        uuid: `${+page - i - 1}`,
      });
    }
  } else {
    for (let i = 0; i < 20; i += 1) {
      data.results.push({
        ...result,
        uuid: `${+page + i + 1}`,
      });
    }
  }

  return data;
};

app.get('/api', (req, res) => {
  // console.log('>> api get');
  // console.log(req.originalUrl);
  // console.log(req.query);
  const data = getData(req.query);
  setTimeout(() => {
    res.send(JSON.stringify({ results: data.results, reverse: req.query.until }));
  }, 200);
});

app.post('/api', (req, res) => {
  // console.log('>> api post');
  res.send('{"test api": "post"}');
});

app.get('/*', (req, res) => {
  // console.log('>> * get');
  // console.log(req.originalUrl);
  // console.log(req.query);
  const data = getData(req.query);
  const location = {
    search: `?${qs.stringify({ ...req.query }, { encode: true })}`,
  };
  res.react(createPreloadedState(location, data));
});

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), () => { // eslint-disable-next-line no-console
  logger(`Express started on http://localhost:${app.get('port')}; press Ctrl-C to terminate.`);
});
