import withStyles from '@material-ui/core/styles/withStyles';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { withRouter } from 'react-router-dom';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updateInput } from '../../../../root/actions/filter-actions';


const styles = theme => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  marginTopBottom: {
    margin: `${theme.spacing.unit}px 0 ${theme.spacing.unit}px 0`,
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
  return (
    <Fragment>
      <div className={classes.root}>
        <FormControl
          fullWidth className={classes.marginTopBottom} >
          <InputLabel
            htmlFor="select-multiple-chip">{label}</InputLabel>
          <Select
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
            value={filterValue}
            onChange={handleUpdateInput(field, history, location, filterOrigin, items)}
          >
            {items.map((item, index) => 
              <MenuItem key={index} value={item.label}>
                <Checkbox
                  checked={filterValue.indexOf(item.label) >= 0}
                />
                {item.label}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  filterReducer: state.filterReducer,
})

const mapDispatchToProps = dispatch => ({
  handleUpdateInput: (field, history, location, filterOrigin, items) => event => {
    const value = mapLabelsToFields(event.target.value, items);
    dispatch(updateInput(field, value, history, location, filterOrigin));
  },
});

export default withRouter(withStyles(styles, { withTheme: true })(connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterMultiselect)));