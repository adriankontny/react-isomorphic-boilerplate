import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updateInput } from '../../../../root/actions/filter-actions';

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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  marginTop: {
    margin: `${theme.spacing.unit}px 0 0 0`,
  },
  marginBottom: {
    margin: `0 0 ${theme.spacing.unit}px 0`,
  },
  marginTopBottom: {
    margin: `${theme.spacing.unit}px 0 ${theme.spacing.unit}px 0`,
  },
});

const FilterRange = props => {
  const { filter, filterReducer, classes, handleUpdateInput, history, location, filtersObjectPath } = props
  const { label, field } = filter;
  const filterValues = filterReducer[filtersObjectPath].filterValues;

  switch (filtersObjectPath) {
    case 'upload':
      return (
        <TextField
          fullWidth
          key={label}
          //variant="outlined"
          className={classes.marginBottom}
          label={label}
          value={filterValues[field] || ''}
          onChange={handleUpdateInput(field, history, location, filtersObjectPath)}
        />
      )

    default:
      return (
        <Fragment>
          <Typography
            className={classes.marginTop}
            variant="subtitle1"
          >
            {label}
          </Typography>
          <Grid
            container
            alignItems="center"
            justify="space-between"
          >
            <Grid xs={5} key={'from'} item>
              <TextField
                fullWidth
                className={classes.marginBottom}
                //variant="outlined"
                label={'from'}
                value={filterValues[`${field}:from`] || ''}
                onChange={handleUpdateInput(`${field}:from`, history, location, filtersObjectPath)}
              />
            </Grid>
            <Grid xs={5} key={'to'} item>
              <TextField
                fullWidth
                className={classes.marginBottom}
                //variant="outlined"
                label={'to'}
                value={filterValues[`${field}:to`] || ''}
                onChange={handleUpdateInput(`${field}:to`, history, location, filtersObjectPath)}
              />
            </Grid>
          </Grid>
        </Fragment>
      )
  }
}

const mapStateToProps = state => ({
  filterReducer: state.filterReducer,
})

const mapDispatchToProps = dispatch => ({
  handleUpdateInput: (field, history, location, filtersObjectPath) => event => {
    dispatch(updateInput(field, event.target.value, history, location, filtersObjectPath));
  },
});

export default withRouter(withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterRange)));