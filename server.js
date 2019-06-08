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
import {
  createMuiTheme,
} from '@material-ui/core/styles';
import {
  ServerStyleSheets,
  ThemeProvider,
} from '@material-ui/styles';
import { grey, blueGrey } from '@material-ui/core/colors';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfigDev from './webpack.config.dev';
// import routes from './server/routes';
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
app.use((req, res, next) => {
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

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];

    // temporaryValue.img = './audi1.jpg'

    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const getData = (firstCursor, lastCursor, isReversed) => {

  const page = 4;
  const image = './audi.jpg';
  const result = {
    img: image,
    title: 'Image',
    author: 'author',
    featured: false,
  };
  const resultFeatured = {
    img: image,
    title: 'Image',
    author: 'author',
    featured: true,
  };
  const data = {
    results: []
  };
  for (let i = 0; i < 20; i++){
    data.results.push({
      ...result,
      uuid: page*20 + i
    })
  }

  return data;
}

app.get('/api', (req, res) => {
  const data = getData();
  console.log('>> api get');
  setTimeout(() => {
    res.send(JSON.stringify({ results: shuffle(data.results) }));
  }, 200)
});

app.post('/api', (req, res) => {
  console.log('>> api post');
  res.send('{"test api": "post"}');
});

app.get('/*', (req, res) => {
  const data = getData();
  const location = {
    search: `?${qs.stringify({ ...req.query }, { encode: false })}`,
  };
  res.react(createPreloadedState(location, data));
});

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), () => { // eslint-disable-next-line no-console
  console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl-C to terminate.`);
});
