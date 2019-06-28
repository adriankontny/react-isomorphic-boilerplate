import withStyles from '@material-ui/core/styles/withStyles';

import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { withRouter } from 'react-router-dom';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updateInput } from '../../../../root/actions/filter-actions';

import Verify from './../../Verify';
import VerifiedSelect from './VerifiedSelect';

const styles = theme => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(0.25),
  },
  marginTopBottom: {
    margin: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px 0`,
  },
});

const mapLabelsToFields = (labels = [], items = []) => {
  const fields = labels.map(label => items.filter(item => item.label === label)).map(item => (item[0] || []).field);
  return fields;
};

const mapFieldsToLabels = (fields = [], items = []) => {
  if (!Array.isArray(fields)) {
    return fields;
  }
  const labels = fields.map(field => items.filter(item => item.field === field)).map(item => (item[0] || []).label);
  return labels;
};

const FilterMultiselect = props => {
  const { filter, filterReducer, classes, handleUpdateInput, history, location, filterOrigin } = props;
  const { label, field, items } = filter;
  const filterValues = filterReducer[filterOrigin].filterValues;

  const filterValue = mapFieldsToLabels(filterValues[field] || [], items);

  const handleOnChange = (field, value) => handleUpdateInput(field, value, items, history, location, filterOrigin)

  return (
    <Fragment>
      <div className={classes.root}>
        <FormControl
          fullWidth className={classes.marginTopBottom} >
          <InputLabel
            htmlFor="select-multiple-chip">{label}</InputLabel>
          <Verify
            onChange={value => handleOnChange(field, value)}
            value={filterValue}
          >
            <VerifiedSelect
              multiple
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => 
                    <Chip key={value} label={value} className={classes.chip} />
                  )}
                </div>
              )}
              fullWidth
              //variant="outlined"
              label={label}
              items={items}
            >
            </VerifiedSelect>
          </Verify>
        </FormControl>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  filterReducer: state.filterReducer,
})

const mapDispatchToProps = dispatch => ({
  handleUpdateInput: (field, value, items, history, location, filterOrigin) => {
    const mappedValue = mapLabelsToFields(value, items);
    dispatch(updateInput(field, mappedValue, history, location, filterOrigin));
  },
});

export default withRouter(withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterMultiselect)));