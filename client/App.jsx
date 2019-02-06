import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Home, Search, Contact, NotFound } from './app';

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

class App extends Component {

  componentDidMount() { // Remove the server-side injected CSS.
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <Fragment>
        <Link to="/">Home</Link>
        {' | '}
        <Link to="/search">Search</Link>
        {' | '}
        <Link to="/contact">Contact</Link>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/contact" component={Contact} />
          <RouteWithStatus statusCode={404} component={NotFound} />
        </Switch>
      </Fragment>
    )
  }
}
App.propTypes = {
};

export default App;
