import React from 'react';
import FilterRange from './filter/FilterRange';
import FilterMultiselect from './filter/FilterMultiselect';

const Filter = props => {

  const { filter, filterOrigin } = props
  const { type } = filter;

  switch (type) {
    case "range":
      return (
        <FilterRange
          {...{ filter, filterOrigin }}
        ></FilterRange>
      )

    case "multiselect":
      return (
        <FilterMultiselect
          {...{ filter, filterOrigin }}
        ></FilterMultiselect>
      )

    default:
      return null
  }
}

export default Filter;