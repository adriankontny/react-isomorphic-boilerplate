import React from 'react';

import Category from './filters/Category'
import Filter from './filters/Filter'

const Filters = props => {

  const { categories, filters, filterOrigin } = props;
  console.log(JSON.stringify(categories));
  return ([
    categories.map((category, index) =>
      <Category
        key={index}
        filterOrigin={filterOrigin}
        path={category.path}
        select={category.select}
      />
    ),
    // filters.map((filter, index) =>
    //   <Filter
    //     key={index}
    //     filterOrigin={filterOrigin}
    //     filter={filter}
    //   />
    // )
  ])
}

export default Filters;