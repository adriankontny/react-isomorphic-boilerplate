import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';

import { Category, Filter } from './index'

const styles = theme => ({
});

const Filters = props => {
  const category = props.category ? props.category : props.filterReducer[props.filterOrigin].filterObject;
  const { classes } = props;
  const { categories, select, filters } = category;

  const categorySelected = find(categories, category => category.value === select);
  return (
    <Fragment>
      <Category {...{...props, category}}></Category>
      {
        categorySelected
          ?
          <Fragment>
            {categories.map((category, index) => index === select &&
              <Filters key={category.label} {...{ ...props, category }}>
              </Filters>
            )}
          </Fragment>
          :
          <Fragment>
            {filters.map(filter => 
              <Filter key={filter.label} {...{ ...props, filter }}>
              </Filter>
            )}
          </Fragment>
      }
    </Fragment>
  )
}

const mapStateToProps = state => ({
  filterReducer: state.filterReducer,
});

const mapDispatchToProps = dispatch => ({
});

export default withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filters));