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
  const { category, classes, handleSelectCategory, location, history } = props
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
          onChange={handleSelectCategory(field, location, history)}
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
  handleSelectCategory: (field, location, history) => event => {
    dispatch(selectCategory(field, event.target.value, location, history));
  }
});

export default withRouter(withStyles(styles, { withTheme: true })(connect(
  () => { return {} },
  mapDispatchToProps,
)(Category)));