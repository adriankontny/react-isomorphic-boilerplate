
import withStyles from '@material-ui/core/styles/withStyles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorder from '@material-ui/icons/StarBorder';
import LinearProgress from '@material-ui/core/LinearProgress';

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadMore, loadMoreDone, changePage } from '../../root/actions/feed-actions'

import { Waypoint } from 'react-waypoint';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  }
});

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
  }
})(LinearProgress);

const Content = props => {
  const { classes, feedReducer, handleLoadMore, handleLoadMoreDone, handleChangePage, history, location } = props;
  const { results, isScrolling, isLoadingTop, isLoadingBottom } = feedReducer;
  return (
    <div>
      <div>
        {isLoadingTop &&
          <BorderLinearProgress variant="query" className={classes.linearProgress} />
        }
        <Waypoint
          scrollableAncestor={global}
          onEnter={handleLoadMore(history, location, 'searchFilter')}
          // onLeave={handleLoadMoreDone(history, location, 'searchFilter')}
        >
        </Waypoint>
      </div>
      
      <div className={classes.root}>
        <GridList cellHeight={200} spacing={1}>
          {results.map((tile, i) => (
            <GridListTile key={i} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
              <img src={tile.img} alt={tile.title} />
              {results.length > 20 && i % 20 === 0 && !isScrolling &&
                <Waypoint
                  scrollableAncestor={global}
                  onEnter={() => handleChangePage(history, location, 'searchFilter')((results[i - 1] || results[i]).uuid)}
                >
                </Waypoint>
              }
              <GridListTileBar
                title={tile.uuid}
                titlePosition="top"
                actionIcon={
                  <IconButton className={classes.icon}>
                    <StarBorder />
                  </IconButton>
                }
                actionPosition="left"
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>

      <div>
        <Waypoint
          scrollableAncestor={global}
          onEnter={handleLoadMore(history, location, 'searchFilter')}
          bottomOffset={"-100%"}
        >
        </Waypoint>
        <Waypoint
          scrollableAncestor={global}
          onEnter={handleLoadMore(history, location, 'searchFilter')}
          bottomOffset={"-50%"}
        >
        </Waypoint>
        <Waypoint
          scrollableAncestor={global}
          onEnter={handleLoadMore(history, location, 'searchFilter')}
        >
        </Waypoint>
        {isLoadingBottom &&
          <BorderLinearProgress variant="query" className={classes.linearProgress} />
        }
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  feedReducer: state.feedReducer,
  filterComponent: state.filterReducer.filterComponent,
  filterComponentValues: state.filterReducer.filterComponentValues,
});

const mapDispatchToProps = dispatch => ({
  handleLoadMore: (history, location, filterOrigin) => (event) => {
    dispatch(loadMore(event, history, location, filterOrigin))
  },
  handleLoadMoreDone: (history, location, filterOrigin) => (event) => {
    dispatch(loadMoreDone(event, history, location, filterOrigin))
  },
  handleChangePage: (history, location, filterOrigin) => (value) => {
    dispatch(changePage(value, history, location, filterOrigin))
  },
});

export default withRouter(withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content)));