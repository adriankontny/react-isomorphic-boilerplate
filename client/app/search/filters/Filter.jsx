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
    case "pair":
      return (
        <Fragment>
          <Typography variant="h6" component="h2">
            Price
          </Typography>
          <Grid
            container
            alignItems="center"
            justify="space-between"
          >
            <Grid xs={6} key={field[0]} item>
              <TextField
                fullWidth
                className={classes.margin}
                //variant="outlined"
                label={label[0]}
                value={filterValues[field[0]] || ''}
                onChange={handleUpdateInput(field[0])}
              />
            </Grid>
            <Grid xs={6} key={field[1]} item>
              <TextField
                fullWidth
                className={classes.margin}
                //variant="outlined"
                label={label[1]}
                value={filterValues[field[1]] || ''}
                onChange={handleUpdateInput(field[1])}
              />
            </Grid>
          </Grid>
        </Fragment>
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