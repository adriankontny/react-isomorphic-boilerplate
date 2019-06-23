import withStyles from '@material-ui/core/styles/withStyles';
import {
  Typography,
} from '@material-ui/core';
import { Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import posed, { PoseGroup } from 'react-pose';

import { transform } from 'popmotion';
const { pipe, clamp, interpolate, blendColor } = transform

const Box = posed.div({
  draggable: 'x',

  passive: {
    backgroundColor: ['x', pipe(
      interpolate([-200, 200], [0, 1]),
      clamp(0, 1),
      blendColor('#FF1C68', '#198FE3')
    )]
  },
  base: {
    // width: '100px',
  },
  enter: {
    width: '100px',
    x: 0,
    delay: 300,
    opacity: 1,
    delay: 300,
    transition: {
      x: { type: 'spring', stiffness: 1000, damping: 35 },
      default: { duration: 300 }
    }
  },
  exit: {
    width: '100px',
    x: 100,
    opacity: 0,
    transition: { duration: 150 },
  }
});

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    //padding: theme.spacing(3),
  },
  box: {
    background: '#ff1c68',
    height: '100px',
    width: '100px',
  }
});

class Filters extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isVisible: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        isVisible: !this.state.isVisible
      });
    }, 2000);
  }

  handleClick() {
    this.setState({isVisible: !this.state.isVisible})
  }

  render() {
    const { classes } = this.props;
    const { isVisible } = this.state;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <PoseGroup
        >
          {isVisible ? [
            <Box key={1}
              className={classes.box}
              pose={'base'}
              onClick={this.handleClick}
            >
            </Box>,
            <Box key={2}
              className={classes.box}
              pose={'base'}
              onClick={this.handleClick}
            >
            </Box>,
            <Box key={3}
              className={classes.box}
              pose={'base'}
              onClick={this.handleClick}
            >
            </Box>
          ] : [
            <Box key={1}
              className={classes.box}
              pose={'base'}
              onClick={this.handleClick}
            >
            </Box>,
            <Box key={3}
              className={classes.box}
              pose={'base'}
              onClick={this.handleClick}
            >
            </Box>
          ]
          }
        </PoseGroup>
      </main>
    )
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
)(Filters));