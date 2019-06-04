import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { withRouter } from 'react-router-dom';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { selectCategory } from '../../../root/actions/filter-actions';


const styles = theme => ({
  marginTopBottom: {
    margin: `${theme.spacing.unit}px 0 ${theme.spacing.unit}px 0`,
  },
});

const Category = props => {
  const { category, classes, handleSelectCategory, history, location, filterOrigin } = props;
  const { label, path, categories, select, field } = category;

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
          label={`Category${field ? ` in ${label}`: ''}`}
          value={select}
          onChange={handleSelectCategory(field, history, location, filterOrigin)}
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
  handleSelectCategory: (field, history, location, filterOrigin) => event => {
    dispatch(selectCategory(field, event.target.value, history, location, filterOrigin));
  }
});

export default withRouter(withStyles(styles, { withTheme: true })(connect(
  () => { return {} },
  mapDispatchToProps,
)(Category)));