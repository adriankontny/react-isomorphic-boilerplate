import withStyles from '@material-ui/core/styles/withStyles';

import CssBaseline from '@material-ui/core/CssBaseline';

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadMore } from '../../root/actions/search-actions'

import { SideBarLeft, TopBar, Filters, Content } from './index'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
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
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
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