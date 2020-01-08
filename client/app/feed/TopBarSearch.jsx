import withStyles from '@material-ui/core/styles/withStyles';

import { fade } from '@material-ui/core/styles/colorManipulator';

import SearchIcon from '@material-ui/icons/Search';

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setSearchInput } from '../../root/actions/search-actions'

import Verify, { VerifiedInputBase } from '../Verify'

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
    const { classes, search, handleSetSearchInput, history, location, filterOrigin } = this.props;
    const handleOnChange = value => handleSetSearchInput({ history, filterOrigin }, value)
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <Verify
          value={search}
          onChange={handleOnChange}
        >
          <VerifiedInputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </Verify>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.searchReducer.search,
});

const mapDispatchToProps = dispatch => ({
  handleSetSearchInput: ({ history, filterOrigin }, value) => {
    dispatch(setSearchInput({ history, filterOrigin }, value))
  },
});

export default withRouter(withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBarSearch)));
