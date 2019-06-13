
import withStyles from '@material-ui/core/styles/withStyles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

import StarBorder from '@material-ui/icons/StarBorder';

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadMore, loadMoreDone, changePage } from '../../root/actions/search-actions'

import { Waypoint } from 'react-waypoint';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
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
  },
});

const Content = props => {
  const { classes, searchReducer, handleLoadMore, handleLoadMoreDone, handleChangePage, history, location } = props;
  const { results, isScrolling } = searchReducer;
  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={1}>
        <Waypoint
          scrollableAncestor={global}
          onEnter={handleLoadMore(history, location, 'searchFilter')}
          // onLeave={handleLoadMoreDone(history, location, 'searchFilter')}
        >
        </Waypoint>
        <Waypoint
          scrollableAncestor={global}
          onEnter={handleLoadMore(history, location, 'searchFilter')}
          // onLeave={handleLoadMoreDone(history, location, 'searchFilter')}
          topOffset={"-50%"}
        >
        </Waypoint>
        {results.map((tile, i) => (
          <GridListTile key={i} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
            <img src={tile.img} alt={tile.title} />
            {results.length > 20 && i % 20 === 1 &&
              <Waypoint
                scrollableAncestor={global}
                onEnter={() => !isScrolling && handleChangePage(history, location, 'searchFilter')((results[i - 1] || results[i]).uuid)}
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
        <Waypoint
          scrollableAncestor={global}
          onEnter={handleLoadMore(history, location, 'searchFilter')}
          // onLeave={handleLoadMoreDone(history, location, 'searchFilter')}
          bottomOffset={"-50%"}
        >
        </Waypoint>
        <Waypoint
          scrollableAncestor={global}
          onEnter={handleLoadMore(history, location, 'searchFilter')}
          // onLeave={handleLoadMoreDone(history, location, 'searchFilter')}
        >
        </Waypoint>
      </GridList>
    </div>
  );
}

const mapStateToProps = state => ({
  searchReducer: state.searchReducer,
  filterObject: state.filterReducer.filterObject,
  filterValues: state.filterReducer.filterValues,
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