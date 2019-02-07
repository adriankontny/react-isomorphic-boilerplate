import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import SideBarLeft from './SideBarLeft.jsx'
import TopBar from './TopBar.jsx'
import Content from './Content.jsx'

const styles = () => ({
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
        <Content />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search));
