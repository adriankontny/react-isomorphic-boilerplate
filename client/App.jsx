import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
        return children || component();
      }}
    />
  );
};
RouteWithStatus.propTypes = {
  statusCode: PropTypes.number.isRequired,
  component: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { initialData } = this.props;

    return (
      <div>
        <Link to="/">Home</Link>
        {' | '}
        <Link to="/contact">Contact</Link>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <RouteWithStatus statusCode={404} component={NotFound} />
        </Switch>
        <p>
          {JSON.stringify(initialData)}
        </p>
      </div>
    );
  }
}
App.propTypes = {
  initialData: PropTypes.shape().isRequired,
};

export default App;
