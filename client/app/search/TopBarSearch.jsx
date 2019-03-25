import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {
  InputBase
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { connect } from 'react-redux';

import { updateSearch } from '../../root/actions/search-actions'

const styles = theme => ({
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class TopBarSearch extends React.Component {

  render() {
    const { classes, search, handleUpdateSearch, location, history } = this.props;
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          value={search}
          onChange={handleUpdateSearch(location, history)}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.searchReducer.search,
});

const mapDispatchToProps = dispatch => ({
  handleUpdateSearch: (location, history) => (event) => {
    dispatch(updateSearch(event.target.value, location, history))
    dispatch({ type: 'PING' });
  },
});

export default withRouter(withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBarSearch)));
