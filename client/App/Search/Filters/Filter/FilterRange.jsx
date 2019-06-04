import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { withRouter } from 'react-router-dom';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updateInput } from '../../../../root/actions/filter-actions';

const styles = theme => ({
  marginTop: {
    margin: `${theme.spacing.unit}px 0 0 0`,
  },
  marginBottom: {
    margin: `0 0 ${theme.spacing.unit}px 0`,
  },
});

const FilterRange = props => {
  const { filter, filterReducer, classes, handleUpdateInput, history, location, filterOrigin } = props
  const { label, field } = filter;
  const filterValues = filterReducer[filterOrigin].filterValues;

  switch (filterOrigin) {
    case 'uploadFilter':
      return (
        <TextField
          fullWidth
          key={label}
          //variant="outlined"
          className={classes.marginBottom}
          label={label}
          value={filterValues[field] || ''}
          onChange={handleUpdateInput(field, history, location, filterOrigin)}
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
                onChange={handleUpdateInput(`${field}:from`, history, location, filterOrigin)}
              />
            </Grid>
            <Grid xs={5} key={'to'} item>
              <TextField
                fullWidth
                className={classes.marginBottom}
                //variant="outlined"
                label={'to'}
                value={filterValues[`${field}:to`] || ''}
                onChange={handleUpdateInput(`${field}:to`, history, location, filterOrigin)}
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
  handleUpdateInput: (field, history, location, filterOrigin) => event => {
    dispatch(updateInput(field, event.target.value, history, location, filterOrigin));
  },
});

export default withRouter(withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterRange)));