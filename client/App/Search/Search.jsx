import withStyles from '@material-ui/core/styles/withStyles';

import CssBaseline from '@material-ui/core/CssBaseline';

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadMore } from '../../root/actions/search-actions'
import { Waypoint } from 'react-waypoint';

import { SideBarLeft, TopBar, Filters, Content } from './index'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  root: {
    display: 'flex',
  },
});

class Search extends React.Component {

  render() {

    const { classes, handleLoadMore, history, location } = this.props;
    
    return (
      <div className={classes.root}>
        <CssBaseline />
        <TopBar />
        <SideBarLeft />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Content />
          <Waypoint
            onEnter={handleLoadMore(history, location, 'searchFilter')}
            bottomOffset={"-10%"}
          >
          </Waypoint>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filterObject: state.filterReducer.filterObject,
  filterValues: state.filterReducer.filterValues,
});

const mapDispatchToProps = dispatch => ({
  handleLoadMore: (history, location, filterOrigin) => (event) => {
    dispatch(loadMore(event, history, location, filterOrigin))
  },
});

export default withRouter(withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search)));

/*

          <Filters 
            filterOrigin={'uploadFilter'}
          >
          </Filters>

import Filters1 from './Filters1.jsx'
import Filters2 from './Filters2.jsx'
import Filter1 from './Filter1.jsx'

        <Filters1>
          <Filter1>
          </Filter1>
        </Filters1>

        <Filters2>
        </Filters2>
*/