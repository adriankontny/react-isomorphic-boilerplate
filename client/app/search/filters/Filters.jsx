import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { selectDropdown } from '../../../root/actions/filter-actions';

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

const Filters = props => {
  console.log('filters')
  const { item, classes, handleSelectDropdown } = props
  const { type, labelDropdown, path, items, label, select } = item;
  console.log(path.join(''));
  switch (type) {
    case 'dropdown':
      return (
        <Fragment>
          <TextField
            key={'id' + path.join('')}
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
          {items.map((item, index) => index === select &&
            <Filters {...{ ...props, item }}>
            </Filters>
          )}
        </Fragment>
      )

    default:
      return null
  }
  
    
  
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