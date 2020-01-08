import withStyles from '@material-ui/core/styles/withStyles';

import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

import { withRouter } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { setFilterInput } from '../../../root/actions/filter-actions';

import Verify, { VerifiedSelect } from '../../Verify';

const styles = theme => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(0.25),
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

const component = (items, value) => items.map((item, index) =>
  <MenuItem key={index} value={item.label}>
    <Checkbox
      checked={value.indexOf(item.label) >= 0}
    />
    {item.label}
  </MenuItem>
)

const FilterMultiselect = props => {
  const { filter, filterReducer, classes, handleSetFilterInput, history, location, filterOrigin } = props;
  const { label, field, items } = filter;
  const filterComponentValues = filterReducer[filterOrigin].filterComponentValues;

  const fields = filterComponentValues[field] ? filterComponentValues[field].split(',') : [];
  const filterValue = mapFieldsToLabels(fields, items);

  const handleOnChange = value => handleSetFilterInput(field, value, items, history, location, filterOrigin)

  return (
    <div className={classes.root}>
      <Verify
        onChange={handleOnChange}
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
          component={component}
        >
        </VerifiedSelect>
      </Verify>
    </div>
  )
}

const mapStateToProps = state => ({
  filterReducer: state.filterReducer,
})

const mapDispatchToProps = dispatch => ({
  handleSetFilterInput: (field, value, items, history, location, filterOrigin) => {
    const mappedValue = mapLabelsToFields(value, items).join(',');
    dispatch(setFilterInput(field, mappedValue, history, location, filterOrigin));
  },
});

export default withRouter(withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterMultiselect)));