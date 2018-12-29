import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Home from './routes/Home';
import Contact from './routes/Contact';
import NotFound from './routes/NotFound';

const RouteWithStatus = props => (
  <Route
    props={props}
    render={({ staticContext }) => {
      if (staticContext) { // eslint-disable-next-line no-param-reassign
        staticContext.statusCode = props.statusCode;
      }

      return <props.component/>;
    }}
  />
);
RouteWithStatus.propTypes = {
  statusCode: PropTypes.number.isRequired,
  component: PropTypes.func.isRequired,
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
