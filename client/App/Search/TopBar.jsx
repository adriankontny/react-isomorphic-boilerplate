import withStyles from '@material-ui/core/styles/withStyles';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

import { fade } from '@material-ui/core/styles/colorManipulator';

import MenuIcon from '@material-ui/icons/Menu';

import React from 'react';
import { connect } from 'react-redux';

import TopBarSearch from './TopBarSearch'
import { toggleSidebarLeft } from '../../root/actions/search-actions'

const drawerWidth = 260;

const styles = theme => ({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});

class Search extends React.Component {

  render() {
    const { classes, handleToggleSidebarLeft } = this.props;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleToggleSidebarLeft}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <TopBarSearch filtersObjectPath={"feed"}/>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = dispatch => ({
  handleToggleSidebarLeft: () => {
    dispatch(toggleSidebarLeft())
  }
});

export default withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search));
