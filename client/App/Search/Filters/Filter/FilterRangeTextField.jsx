import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';

import { withRouter } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { updateInput } from '../../../../root/actions/filter-actions';

import debounce from 'lodash/debounce';

const styles = theme => ({
  marginBottom: {
    margin: `0 0 ${theme.spacing.unit}px 0`,
  },
});

const FilterRangeTextField = props => {
  const { field, label, filterReducer, classes, handleUpdateInput, history, location, filterOrigin } = props
  const filterValues = filterReducer[filterOrigin].filterValues;

  const debouncedHandleUpdateInput = useCallback(
    debounce(
      (handleUpdateInput, field, target, history, location, filterOrigin) => handleUpdateInput(field, target, history, location, filterOrigin),
      300,
      { trailing: true }
    ), [])

  useEffect(() => {
    return debouncedHandleUpdateInput.cancel();
  }, [])

  const [error, setError] = useState('');
  const [value, setValue] = useState(filterValues[field] || '');

  const handleOnChange = (field, history, location, filterOrigin) => {
    return event => {
      const validator = { validate: () => true };
      const { target } = event;
      const { value } = target;
      if (true || validator.validate(value)) {
        debouncedHandleUpdateInput(handleUpdateInput, field, target, history, location, filterOrigin);
        setError('')
        setValue(value)
      } else {
        setError('failed')
        setValue(value)
      }
    };
  }
  return (
    <TextField
      fullWidth
      className={classes.marginBottom}
      //variant="outlined"
      label={label}
      value={value}
      error={error}
      helperText={error}
      onChange={handleOnChange(field, history, location, filterOrigin)}
    />
  )
}

const mapStateToProps = state => ({
  filterReducer: state.filterReducer,
})

const mapDispatchToProps = dispatch => ({
  handleUpdateInput: (field, target, history, location, filterOrigin) => {
    dispatch(updateInput(field, target.value, history, location, filterOrigin));
  },
});

export default withRouter(withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterRangeTextField)));