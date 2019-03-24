import { withStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { selectCategory } from '../../../root/actions/filter-actions';

import {
  TextField,
  MenuItem,
  ExpansionPanel
} from '@material-ui/core';

const styles = theme => ({
});

const Category = props => {
  const { category, classes, handleSelectCategory } = props
  const { labelCategories, path, categories, select, field } = category;

  return (
    <Fragment>
      {!!categories.length &&
        <TextField
          fullWidth
          cols={2}
          key={'id__0' + path.join('')}
          select
          className={classes.margin}
          //variant="outlined"
          label={labelCategories}
          value={select}
          onChange={handleSelectCategory(field)}
        >
          {[<MenuItem key={'empty'} value="">
              <em>None</em>
            </MenuItem>,
            ...categories.map(category =>
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          )]}
        </TextField>
      }
    </Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  handleSelectCategory: field => event => {
    dispatch(selectCategory(field, event.target.value));
  }
});

export default // withStyles(styles, { withTheme: true })(
  connect(
    () => { return {} },
    mapDispatchToProps,
  )(Category)
// );