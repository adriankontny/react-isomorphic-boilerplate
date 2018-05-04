import express from 'express';
import morgan from 'morgan';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfigDev from './webpack.config.dev';
import App from './client/App';

const app = express();

if (process.env.NODE_ENV === 'development') {
  console.info(`process.env is '${process.env.NODE_ENV}', connecting webpack middlewares.`);

  const compiler = webpack(webpackConfigDev);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfigDev.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: '/__what',
    heartbeat: 250,
  }));
} else {
  console.info(`process.env is '${process.env.NODE_ENV}', using client bundle created with 'npm run build' or run without client-side javascript.`);
}

app.set('view engine', 'ejs');
app.use((req, res, next) => {
  res.react = () => {
    /* eslint-disable */
    const context = {};
    const staticContent = renderToString(
      <Router location={req.originalUrl} context={context}>
        <App initialData={res.initialData} />
      </Router>
    );
    const status = context.statusCode || 200;
    res.status(status).render('index.ejs', {
      staticContent,
      bundle: require('./prod/webpack-assets.json').client.js,
      initialData: JSON.stringify(res.initialData),
    });
    /* eslint-enable */
  };
  next();
});

app.use(morgan('combined'));

app.use(express.static('dist'));

app.use('/', require('./server/routes/home.js'));
app.use('/contact', require('./server/routes/contact.js'));

app.get('/*', (req, res) => {
  res.initialData = res.initialData || { ssr: `Server path: ${req.originalUrl}` };
  res.react();
});

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), () => {
  console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl-C to terminate.`);
});
