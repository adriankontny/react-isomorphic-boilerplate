import { withStyles } from '@material-ui/core/styles';
import {
  Divider,
} from '@material-ui/core';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { find } from 'lodash';

import Category from './filters/Category.jsx'
import Filter from './filters/Filter.jsx'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  menu: {
    width: 200,
  }
});

const Filters = props => {
  const { classes, category } = props
  const { categories, select, filters } = category;

  const categorySelected = find(categories, category => category.value === select);
  return (
    <Fragment>
      <Category {...props}></Category>
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
            <Divider />
            {filters.map(filter => 
              <Filter key={filter.label} {...{ ...props, filter }}>
              </Filter>
            )}
          </Fragment>
      }
    </Fragment>
  )
}

export default withStyles(styles, { withTheme: true })(Filters);