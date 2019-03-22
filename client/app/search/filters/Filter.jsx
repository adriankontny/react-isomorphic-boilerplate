import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { updateInput } from '../../../root/actions/filter-actions';

import {
  TextField,
  Grid,
  Typography
} from '@material-ui/core';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  menu: {
    width: 200,
  },
  paper: {
    textAlign: 'center'
  }
});

const Filter = props => {
  const { filter, filterValues, classes, handleUpdateInput } = props
  const { label, field, type } = filter;

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

const mapDispatchToProps = dispatch => ({
  handleUpdateInput: filter => event => {
    dispatch(updateInput(filter, event.target.value));
  }
});

export default withStyles(styles, { withTheme: true })(connect(
  () => { return {} },
  mapDispatchToProps,
)(Filter));