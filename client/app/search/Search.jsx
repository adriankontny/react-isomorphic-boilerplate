import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import SideBarLeft from './SideBarLeft.jsx'
import TopBar from './TopBar.jsx'
import Filters from './filters/Filters.jsx'

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
    
    const { classes, filters } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <TopBar />
        <SideBarLeft />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Filters item={filters}>
          </Filters>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filterReducer,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search));

/*
import Content from './Content.jsx'
import Filters from './Filters.jsx'
import Filters2 from './Filters2.jsx'
import Filter from './Filter.jsx'

        <Filters>
          <Filter>
          </Filter>
        </Filters>

        <Filters2>
        </Filters2>
*/