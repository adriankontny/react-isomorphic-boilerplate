import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Home from './routes/Home';
import Contact from './routes/Contact';
import NotFound from './routes/NotFound';

const RouteStatus = props => (
  <Route
    render={({ staticContext }) => {
        if (staticContext) { // eslint-disable-next-line no-param-reassign
          staticContext.statusCode = props.statusCode;
        }

        return <div>{props.children}</div>;
      }}
  />
);
RouteStatus.propTypes = {
  statusCode: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        {' | '}
        <Link to="/contact">Contact</Link>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <RouteStatus statusCode={404}>
            <NotFound />
          </RouteStatus>
        </Switch>
        <p>
          {JSON.stringify(this.props.initialData)}
        </p>
      </div>
    );
  }
}
App.propTypes = {
  initialData: PropTypes.shape().isRequired,
};

export default App;
