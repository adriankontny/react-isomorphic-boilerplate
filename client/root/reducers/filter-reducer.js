import {
  SELECT_CATEGORY, UPDATE_INPUT
} from '../actions/filter-actions'
import qs from 'qs';
import { produce, original } from 'immer';
import { get, keys } from 'lodash';

const getItem = (filters, path = []) => {
  return !path.length
    ? filters
    : get(filters, `categories[${path.join('].categories[')}]`) || filters;
};

import category from './filter-reducer-data/category.json'
import paths from './filter-reducer-data/paths.json'

const _categoriesArrayFromReduxState = (draftState, draftItem = draftState, categoriesArray = []) => {
  if ( draftItem.select !== '' ) {
    draftItem['categories']
    .forEach((draftItemChild, index) => {
      if(index === draftItem.select) {
        categoriesArray.push({field: draftItemChild.field, key: index});
        return _categoriesArrayFromReduxState(draftState, draftItemChild, categoriesArray);
      }
    });
  }
  return categoriesArray;
};

const filtersArraysToUrl = (state, [categoriesArray, filtersArray], location, history ) => {
  
  const newState = produce(state, draftState => {
    draftState.location.search = {};
    filtersArray.forEach(item => {
      draftState.location.search[item.field] = Array.isArray(item.value) ? item.value.join(',') : item.value;
    });
  });

  let search = {
    q: qs.parse(location.search, { ignoreQueryPrefix: true }).q,
    ...newState.location.search
  };

  search = qs.stringify({ ...search }, { encode: true });
  history.replace({search});

  return newState;
};

const filtersArraysFromReduxState = (draftState) => {
  const categoriesArray = _categoriesArrayFromReduxState(draftState.category);
  const filtersArray = keys(draftState.filterValues)
    .map(filter => {return{field: filter, value: draftState.filterValues[filter]}})
    .filter(filter => filter.value);
  return [categoriesArray, filtersArray];
};

const updateUrl = (state, location, history) => {
  const [categoriesArray, filtersArray] = filtersArraysFromReduxState(state);
  return filtersArraysToUrl(state, [categoriesArray, filtersArray], location, history);
};

const selectCategory = (state, field, value) => {
  const category = produce(state.category, draftState => {
    const draftItem = getItem(draftState, paths[field]);
    draftItem.select = value;
  });
  return { ...state, category }
}

const updateInput = (state, field, value) => {
  const filterValues = produce(state.filterValues, draftState => { 
    if (value.length === 0) {
      delete draftState[field];
    } else {
      draftState[field] = value;
    }
  });
  return { ...state, filterValues }
}

export default function filterReducer(
  state = {
    category,
    location: {},
    filterValues: {},
  },
  { type, payload }) { // action: { type, payload }
  let field;
  let newState;
  switch (type) {
    case SELECT_CATEGORY:
      newState = selectCategory(state, payload.field, payload.value);
      newState = updateUrl(newState, payload.location, payload.history);
      return newState;
    case UPDATE_INPUT:
      newState = updateInput(state, payload.field, payload.value)
      newState = updateUrl(newState, payload.location, payload.history);
      return newState;
    default:
      return { ...state };
  }
};
