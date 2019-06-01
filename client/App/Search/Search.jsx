import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import { SideBarLeft, TopBar, Filters } from './index'

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

    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <CssBaseline />
        <TopBar />
        <SideBarLeft />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Filters 
            filtersObjectPath={'upload'}
          >
          </Filters>
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
  dispatch,
});

export default withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search));

/*
import Content from './Content.jsx'
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