import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { updateInput, selectMultiselect } from '../../../root/actions/filter-actions';

import {
  TextField,
  Grid,
  Typography,
  MenuItem,
  Select,
  Chip,
  FormControl,
  InputLabel
} from '@material-ui/core';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

const Filter = props => {
  const { filters, filter, filterValues, classes, handleUpdateInput } = props
  const { label, field, type, items, value } = filter;

  switch (type) {
    case "range":
      return (
        <Fragment>
          <Typography
            className={classes.margin}
            variant="subtitle1"
          >
            Price
          </Typography>
          <Grid
            container
            alignItems="center"
            justify="space-between"
          >
            <Grid xs={5} key={'from'} item>
              <TextField
                fullWidth
                className={classes.margin}
                //variant="outlined"
                label={'from'}
                value={filterValues[`${field}:from`] || ''}
                onChange={handleUpdateInput(`${field}:from`)}
              />
            </Grid>
            <Grid xs={5} key={'to'} item>
              <TextField
                fullWidth
                className={classes.margin}
                //variant="outlined"
                label={'to'}
                value={filterValues[`${field}:to`] || ''}
                onChange={handleUpdateInput(`${field}:to`)}
              />
            </Grid>
          </Grid>
        </Fragment>
      )
    case "multiselect":
      return (
        <div className={classes.root}>
          <FormControl 
          fullWidth className={classes.margin} >
            <InputLabel 
            htmlFor="select-multiple-chip">{label}</InputLabel>
            <Select 
              multiple
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              fullWidth
              //variant="outlined"
              label={label}
              value={filterValues[field] || []}
              onChange={handleUpdateInput(field)}
            >
              {items.map(item =>
                <MenuItem key={item.value} value={item.label}>
                  {item.label}
                </MenuItem>
              )}
            </Select>
        </FormControl>
        </div>
      )
    default:
      return (
        <TextField
          fullWidth
          key={label}
          className={classes.margin}
          //variant="outlined"
          label={label}
          value={filterValues[field] || ''}
          onChange={handleUpdateInput(filter)}
        />
      )
  }
}

const mapStateToProps = state => ({
  filterValues: state.filterReducer.filterValues,
})

const mapDispatchToProps = dispatch => ({
  handleUpdateInput: field => event => {
    dispatch(updateInput(field, event.target.value));
  },
});

export default withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter));