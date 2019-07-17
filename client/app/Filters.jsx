import React from 'react';
import { connect } from 'react-redux';

import Category from './filters/Category'
import Filter from './filters/Filter'

import {
  getCategoriesArray,
  getFiltersArray,
} from '../root/reducers/filter-reducer-helpers';

const Filters = props => {

  const { filterReducer, filterOrigin } = props;
  const categories = getCategoriesArray(filterReducer[filterOrigin]);
  const filters = getFiltersArray(filterReducer[filterOrigin]);

  return ([
    categories.map((category, index) =>
      <Category
        key={index}
        filterOrigin={filterOrigin}
        path={category.path}
        select={category.select}
      />
    ),
    filters.map((filter, index) =>
      <Filter
        key={index}
        filterOrigin={filterOrigin}
        filter={filter}
      />
    )
  ])
}

const mapStateToProps = state => ({
  filterReducer: state.filterReducer
});

export default connect(
  mapStateToProps
)(Filters);