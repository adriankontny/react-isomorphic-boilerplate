import React from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';

import { Category, Filter } from './index'

const Filters = props => {

  const category = props.category ? props.category : props.filterReducer[props.filterOrigin].filterObject;
  const { categories, select, filters } = category;

  const categorySelected = find(categories, category => category.value === select);
  return ([
    <Category {...{ ...props, category }}></Category>,
    (categorySelected
      ?
      (categories.map((category, index) => index === select &&
        <Filters key={category.label} {...{ ...props, category }}>
        </Filters>
      ))
      :
      (filters.map(filter =>
        <Filter key={filter.label} {...{ ...props, filter }}>
        </Filter>
      ))
    )
  ])
}

const mapStateToProps = state => ({
  filterReducer: state.filterReducer,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filters);