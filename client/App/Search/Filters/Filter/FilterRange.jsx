import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import React from 'react';

import FilterRangeTextField from './FilterRangeTextField'

const styles = theme => ({
  marginTop: {
    margin: `${theme.spacing.unit}px 0 0 0`,
  }
});

const FilterRange = props => {
  const { filter, classes, filterOrigin } = props
  const { label, field } = filter;

  switch (filterOrigin) {
    case 'uploadFilter':
      return (
        <FilterRangeTextField
          filter={filter}
          field={field}
          label={label}
          filterOrigin={filterOrigin}
        />
      )

    default:
      return ([
        <Typography
          className={classes.marginTop}
          variant="subtitle1"
        >
          {label}
        </Typography>,
        <Grid
          container
          alignItems="center"
          justify="space-between"
        >
          <Grid xs={5} key={'from'} item>
            <FilterRangeTextField
              filter={filter}
              field={`${field}:from`}
              label={'from'}
              filterOrigin={filterOrigin}
            />
          </Grid>
          <Grid xs={5} key={'to'} item>
            <FilterRangeTextField
              filter={filter}
              field={`${field}:to`}
              label={'to'}
              filterOrigin={filterOrigin}
            />
          </Grid>
        </Grid>
      ])
  }
}

export default withStyles(styles, { withTheme: true })(FilterRange);