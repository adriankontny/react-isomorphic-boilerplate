import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { selectCategory } from '../../../root/actions/filter-actions';

import {
  TextField,
  MenuItem,
  ExpansionPanel
} from '@material-ui/core';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  menu: {
    width: 200,
  },
  marginTopBottom: {
    margin: `${theme.spacing.unit}px 0 ${theme.spacing.unit}px 0`,
  },
});

const Category = props => {
  const { category, classes, handleSelectCategory, history, location, filtersObjectPath } = props
  const { labelCategories, path, categories, select, field } = category;

  return (
    <Fragment>
      {!!categories.length &&
        <TextField
          fullWidth
          cols={2}
          key={'id__0' + path.join('')}
          select
          className={classes.marginTopBottom}
          //variant="outlined"
          label={labelCategories}
          value={select}
          onChange={handleSelectCategory(field, history, location, filtersObjectPath)}
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
  handleSelectCategory: (field, history, location, filtersObjectPath) => event => {
    dispatch(selectCategory(field, event.target.value, history, location, filtersObjectPath));
  }
});

export default withRouter(withStyles(styles, { withTheme: true })(connect(
  () => { return {} },
  mapDispatchToProps,
)(Category)));