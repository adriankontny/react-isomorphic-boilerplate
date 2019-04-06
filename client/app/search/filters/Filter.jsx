import React from 'react';
import FilterRange from './filter/FilterRange'
import FilterMultiselect from './filter/FilterMultiselect'

const Filter = props => {
  const { filter, upload } = props
  const { type } = filter;

  switch (type) {
    case "range":
      return (
        <FilterRange
          {...{ filter, upload }}
        ></FilterRange>
      )

    case "multiselect":
      return (
        <FilterMultiselect
          {...{ filter, upload }}
        ></FilterMultiselect>
      )

    default:
      return null
  }
}

export default Filter;