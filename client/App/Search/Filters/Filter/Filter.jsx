import React from 'react';
import { FilterRange, FilterMultiselect } from './index';

const Filter = props => {
  const { filter, filtersObjectPath } = props
  const { type } = filter;

  switch (type) {
    case "range":
      return (
        <FilterRange
          {...{ filter, filtersObjectPath }}
        ></FilterRange>
      )

    case "multiselect":
      return (
        <FilterMultiselect
          {...{ filter, filtersObjectPath }}
        ></FilterMultiselect>
      )

    default:
      return null
  }
}

export default Filter;