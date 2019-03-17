import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { selectCategory, updateInput } from '../../root/actions/filter-actions';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    width: 200,
    flexBasis: 200,
  },
  menu: {
    width: 200,
  },
});

const Category = props => {
  const { category, classes, handleSelectCategory } = props
  const { labelDropdown, path, items, select } = category;

  return (
    <Fragment>
      {!!items.length &&
        <TextField
          key={'id__0' + path.join('')}
          select
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label={labelDropdown}
          value={select}
          onChange={handleSelectCategory(category)}
        >
          {items.map(category =>
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          )}
        </TextField>
      }
    </Fragment>
  )
}

const Filter = props => {
  const { category, filterValues, classes, handleUpdateInput } = props
  const { label, field } = category;
  return (
    <TextField
      key={label}
      className={classNames(classes.margin, classes.textField)}
      variant="outlined"
      label={label}
      value={filterValues[field] || ''}
      onChange={handleUpdateInput(category)}
    />
  )
}

const Filters = props => {
  const { category } = props
  const { items, select, filters } = category;

  const itemSelected = find(items, category => category.value === select);
  return (
    <Fragment>
      <Category {...props}></Category>
      {
        itemSelected
          ?
          <Fragment>
            {items.map((category, index) => index === select &&
              <Filters key={category.label} {...{ ...props, category }}>
              </Filters>
            )}
          </Fragment>
          :
          <Fragment>
            <hr />
            {filters.map(category =>
              <Filter key={category.label} {...{ ...props, category }}>
              </Filter>
            )}
          </Fragment>
      }
    </Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  handleSelectCategory: category => event => {
    dispatch(selectCategory(category, event.target.value));
  },
  handleUpdateInput: category => event => {
    dispatch(updateInput(category, event.target.value));
  }
});

export default withStyles(styles, { withTheme: true })(connect(
  () => {return {}},
  mapDispatchToProps,
)(Filters));