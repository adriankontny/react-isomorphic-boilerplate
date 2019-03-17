import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import SwipeableViews from "react-swipeable-views";
import Animated from "animated/lib/targets/react-dom";

const slides = [
  { backgroundColor: "#ff0", id: "0" },
  { backgroundColor: "#fff", id: "1" },
  { backgroundColor: "#ff0", id: "2" },
  { backgroundColor: "#fff", id: "3" },
  { backgroundColor: "#ff0", id: "4" },
  { backgroundColor: "#fff", id: "5" }
];

const styles = {
  swipeableViews: {
    padding: 80,
  },
  slide: {
    opacity: 0.3,
    scale: 0.8,
    padding: 25,
    animatedDiv: {
      minHeight: 400,
      // backgroundColor: "#bbb",
    },
  }
};

const window = window || {
  innerWidth : 1000,
  addEventListener: () => {},
  removeEventListener: () => {},
};
class Filters extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      index: 0,
      windowWidth: window.innerWidth,
      position: new Animated.Value(0)
    };
    this.updateDimensions = this.updateDimensions.bind(this)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
  }

  updateDimensions() {
    this.setState({ windowWidth: window.innerWidth });
  };
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  };
  handleChangeIndex(index) {
    this.setState({ index });
  };
  handleSwitch(index, type) {
    if (type === "end") {
      Animated.spring(this.state.position, { toValue: index }).start();
      return;
    }
    this.state.position.setValue(index);
  };

  render() {
    const { index, position, windowWidth } = this.state;
    return (
      <SwipeableViews
        enableMouseEvents
        style={styles.swipeableViews}
        onChangeIndex={this.handleChangeIndex}
        onSwitching={this.handleSwitch}
      >
        {slides.map((slide, slideIndex) => {
          const inputRange = slides.map((_, i) => i);
          const scale = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => {
              return slideIndex === i ? 1 : styles.slide.scale;
            })
          });
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => {
              return slideIndex === i ? 1 : styles.slide.opacity;
            })
          });
          const translateX = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => {
              const halfPadding = styles.slide.padding / 4 +20;
              const translate = windowWidth / (halfPadding * styles.slide.scale) - halfPadding;
              if (i > slideIndex) {
                return translate;
              } else if (i < slideIndex) {
                return -translate;
              } else {
                return 0;
              }
            })
          });
          return (
            <div key={slide.id}
              style={{ padding: `${styles.slide.padding}px ${styles.slide.padding}px` }}
            >
              <Animated.div
                key={String(slideIndex)}
                style={{
                    opacity,
                    transform: [{ scale }, { translateX }],
                    ...styles.slide.animatedDiv,
                  }}
              >
                {this.props.children}
              </Animated.div>
            </div>
          );
        })}
      </SwipeableViews>
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
)(Filters));
