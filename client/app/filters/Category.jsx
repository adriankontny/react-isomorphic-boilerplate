import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { withRouter } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { setCategory } from '../../root/actions/filter-actions';

import { filterBlueprint } from '../../root/reducers/filter-reducer-data';
import { getItem } from '../../root/reducers/filter-reducer-helpers';

const styles = theme => ({
  marginTopBottom: {
    margin: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px 0`,
  },
});

const Category = props => {
  const { path, select, classes, handleSetCategory, history, location, filterOrigin } = props;

  const category = getItem(filterBlueprint, path);
  const { label, categories, field } = category;

  return (
    <TextField
      fullWidth
      cols={2}
      key={'id__0' + path.join('')}
      select
      className={classes.marginTopBottom}
      //variant="outlined"
      label={`Category${field ? ` in ${label}` : ''}`}
      value={select}
      onChange={handleSetCategory(field, history, location, filterOrigin)}
    >
      {[<MenuItem key={'empty'} value="">
        <em>None</em>
      </MenuItem>,
      ...categories.map((category, index) =>
        <MenuItem key={category.value} value={index}>
          {category.label}
        </MenuItem>
      )]}
    </TextField>
  )
}

const mapDispatchToProps = dispatch => ({
  handleSetCategory: (field, history, location, filterOrigin) => event => {
    dispatch(setCategory(field, event.target.value, history, location, filterOrigin));
  }
});

export default withRouter(withStyles(styles, { withTheme: true })(connect(
  () => { return {} },
  mapDispatchToProps,
)(Category)));