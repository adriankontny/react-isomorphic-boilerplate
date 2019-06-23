import withStyles from '@material-ui/core/styles/withStyles';

import InputBase from '@material-ui/core/InputBase';

import { fade } from '@material-ui/core/styles/colorManipulator';

import SearchIcon from '@material-ui/icons/Search';

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateSearch } from '../../root/actions/search-actions'

const styles = theme => ({
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
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
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
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
    const { classes, search, handleUpdateSearch, history, location, filterOrigin } = this.props;
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          value={search}
          onChange={handleUpdateSearch(history, location, filterOrigin)}
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
  handleUpdateSearch: (history, location, filterOrigin) => (event) => {
    dispatch(updateSearch(event.target.value, history, location, filterOrigin))
  },
});

export default withRouter(withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBarSearch)));
