import { withStyles } from '@material-ui/core/styles';
import {
  Divider,
  Drawer,
  SwipeableDrawer,
  Hidden,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import { toggleSidebarLeft } from '../../root/actions/search-actions';

import Filters from './Filters.jsx';

const drawerWidth = 280;

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
});

class SideBarLeft extends React.Component {

  render() {
    const { classes, theme, filterObject, sidebarLeftIsVisible, handleToggleSidebarLeft } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <main className={classes.content}>
          <Filters
            filtersObjectPath={'search'}
            category={filterObject}
          >
          </Filters>
        </main>
      </div>
    );
    return (
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <SwipeableDrawer
            container={this.props.container}
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={sidebarLeftIsVisible}
            onOpen={handleToggleSidebarLeft}
            onClose={handleToggleSidebarLeft}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </SwipeableDrawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  filterObject: state.filterReducer.filterObject,
  sidebarLeftIsVisible: state.searchReducer.sidebarLeftIsVisible,
});

const mapDispatchToProps = dispatch => ({
  handleToggleSidebarLeft: () => {
    dispatch(toggleSidebarLeft());
  },
});

export default withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideBarLeft));