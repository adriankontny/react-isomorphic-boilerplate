import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import Home from './app/Home';
import Feed from './app/Feed';
import Contact from './app/Contact';
import NotFound from './app/NotFound';
import { setFilterInitialState } from './root/actions/filter-actions';

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
    if (!module.hot) {
      const { handleSetFilterInitialState, history, location } = this.props;
      handleSetFilterInitialState( history, location );
    }
  }

  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Feed} />
          <Route path="/contact" component={Contact} />
          <RouteWithStatus statusCode={404} component={NotFound} />
        </Switch>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = dispatch => ({
  handleSetFilterInitialState: ( history, location ) => {
    dispatch(setFilterInitialState( history, location ));
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
