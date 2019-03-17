import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { selectDropdown } from '../../root/actions/filter-actions';

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
  const { item, classes, handleSelectDropdown } = props
  const { labelDropdown, path, items, select } = item;

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
          onChange={handleSelectDropdown(item)}
        >
          {items.map(item =>
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          )}
        </TextField>
      }
    </Fragment>
  )
}

const Filter = props => {
  const { item, classes } = props
  const { label, select } = item;
  return (
    <TextField
      key={label}
      className={classNames(classes.margin, classes.textField)}
      variant="outlined"
      label={label}
      value={select}
      // onChange={handleSelectDropdown(item)}
    />
  )
}

const Filters = props => {
  const { item } = props
  const { items, select, filters } = item;

  const itemSelected = find(items, item => item.value === select);
  return (
    <Fragment>
      <Category {...props}></Category>
      {
        itemSelected
          ?
          <Fragment>
            {items.map((item, index) => index === select &&
              <Filters key={item.label} {...{ ...props, item }}>
              </Filters>
            )}
          </Fragment>
          :
          <Fragment>
            <hr />
            {filters.map(item =>
              <Filter key={item.label} {...{ ...props, item }}>
              </Filter>
            )}
          </Fragment>
      }
    </Fragment>
  )
}


const mapDispatchToProps = dispatch => ({
  handleSelectDropdown: item => event => {
    dispatch(selectDropdown(item, event.target.value));
  }
});

export default withStyles(styles, { withTheme: true })(connect(
  () => {return {}},
  mapDispatchToProps,
)(Filters));