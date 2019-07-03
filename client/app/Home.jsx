import withStyles from '@material-ui/core/styles/withStyles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setQuery } from '../root/actions/home-actions'

const Home = ({ location, input, handleUpdate }) => {
  const { pathname, search, hash } = location;
  const viewLocation = { pathname, search, hash };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <p>Home page</p>
      <p>
        {JSON.stringify(viewLocation)}
      </p>
      <input
        type="text"
        value={input}
        onChange={handleUpdate}
      />
    </div>
  );
};
Home.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    key: PropTypes.string,
  }).isRequired,
  input: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  input: state.homeReducer.query,
});

const mapDispatchToProps = dispatch => ({
  handleUpdate: (event) => {
    dispatch(setQuery(event.target.value))
    dispatch({ type: 'PING' });
  },
});

export default withStyles({})(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home));
