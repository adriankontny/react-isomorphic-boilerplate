import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Home from './app/Home';
import Contact from './app/Contact';
import NotFound from './app/NotFound';

const RouteWithStatus = (props) => {
  const { children, component, statusCode } = props;
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) { // eslint-disable-next-line no-param-reassign
          staticContext.statusCode = statusCode;
        }
        return component() || children;
      }}
    />
  );
};
RouteWithStatus.propTypes = {
  statusCode: PropTypes.number.isRequired,
  component: PropTypes.func,
  children: PropTypes.element,
};
RouteWithStatus.defaultProps = {
  component: () => undefined,
  children: <Fragment />,
};

const App = () => (
  <div>
    <Link to="/">Home</Link>
    {' | '}
    <Link to="/contact">Contact</Link>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/contact" component={Contact} />
      <RouteWithStatus statusCode={404} component={NotFound} />
    </Switch>
  </div>
);
App.propTypes = {
};

export default App;
