import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { withRouter } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { setFilterInput } from '../../../root/actions/filter-actions';

import Verify, { VerifiedTextField } from '../../Verify';

const styles = theme => ({
  marginTop: {
    margin: `${theme.spacing(1)}px 0 0 0`,
  },
  marginBottom: {
    margin: `0 0 ${theme.spacing(1)}px 0`,
  },
});

const FilterRange = props => {
  const { filter, filterReducer, classes, handleSetFilterInput, history, filterOrigin } = props
  const { label, field } = filter;
  const filterComponentValues = filterReducer[filterOrigin].filterComponentValues;

  const handleOnChange = (field, value) => handleSetFilterInput({ history, filterOrigin }, field, value)

  switch (filterOrigin) {
    case 'uploadFilter':
      return (
        <Verify
          key={label}
          value={filterComponentValues[field] || ''}
          onChange={value => handleOnChange(field, value)}
        >
          <VerifiedTextField
            fullWidth
            label={label}
            // variant="outlined"
            className={classes.marginBottom}
          />
        </Verify>
      )

    default:
      return ([
        <Typography key={'0' + field}
          className={classes.marginTop}
          variant="subtitle1"
        >
          {label}
        </Typography>,
        <Grid key={'1' + field}
          container
          alignItems="center"
          justify="space-between"
        >
          <Grid xs={5} key={'from'} item>
            <Verify
              value={filterComponentValues[`${field}:from`] || ''}
              onChange={value => handleOnChange(`${field}:from`, value)}
            >
              <VerifiedTextField
                fullWidth
                label={'from'}
                // variant="outlined"
                className={classes.marginBottom}
              />
            </Verify>
          </Grid>
          <Grid xs={5} key={'to'} item>
            <Verify
              value={filterComponentValues[`${field}:to`] || ''}
              onChange={value => handleOnChange(`${field}:to`, value)}
            >
              <VerifiedTextField
                fullWidth
                label={'to'}
                // variant="outlined"
                className={classes.marginBottom}
              />
            </Verify>
          </Grid>
        </Grid>
      ])
  }
}

const mapStateToProps = state => ({
  filterReducer: state.filterReducer,
})

const mapDispatchToProps = dispatch => ({
  handleSetFilterInput: ({ history, filterOrigin }, field, value) => {
    dispatch(setFilterInput({ history, filterOrigin }, field, value));
  },
});

export default withRouter(withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterRange)));