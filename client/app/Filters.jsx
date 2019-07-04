import React from 'react';
import get from 'lodash/get';

import Category from './filters/Category'
import Filter from './filters/Filter'

const Filters = props => {

  const { category, filterOrigin } = props;
  const subCategoryExists = category.categories.length > 0
  const subCategorySelected = get(category, `categories[${category.select}]`)

  return ([
    subCategoryExists
      ?
      <Category
        key={category.label}
        filterOrigin={filterOrigin}
        category={category}
      />
      :
      null,
    subCategorySelected
      ?
      <Filters
        key={subCategorySelected.label}
        filterOrigin={filterOrigin}
        category={subCategorySelected}
      />
      :
      (category.filters.map((filter, index) =>
        <Filter
          key={index}
          filterOrigin={filterOrigin}
          filter={filter}
        />
      ))
  ])
}

export default Filters;