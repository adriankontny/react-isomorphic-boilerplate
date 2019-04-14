import {
  INITIALIZE_FILTERS,
  SELECT_CATEGORY,
  UPDATE_INPUT
} from '../actions/filter-actions'
import { filterObject, paths } from './filter-reducer-data/';
import {
  getItem,
  selectCategory,
  // setFilters,
  // setFiltersExternal,
  // toggleExpander,
  // searchItems,
  updateInput,
  filtersArraysFromUrl,
  filtersArraysToUrl,
  filtersArraysFromReduxState,
  filtersArraysToReduxState,
} from './filter-reducer-helpers/';
import qs from 'qs';
import { produce, original } from 'immer';
import { get, keys, some, toPairs } from 'lodash';


const updateUrl = (state, history, location) => {
  const [categoriesArray, filtersArray] = filtersArraysFromReduxState(state);
  return filtersArraysToUrl(state, [categoriesArray, filtersArray], history, location);
};

export const createFilterReducerPreloadedState = (location) => {
  const state = {
    filterObject,
    location: {},
    filterValues: {},
  }
  const [categoriesArray, filtersArray] = filtersArraysFromUrl(state, location.search);
  const newState = filtersArraysToReduxState(state, [categoriesArray, filtersArray]);
  return newState;
}

export function filterReducer(
  state = {},
  { type, payload }) { // action: { type, payload }
  let newState;
  switch (type) {
    case INITIALIZE_FILTERS:
      // todo: check cache, etc 
      return state;
    case SELECT_CATEGORY:
      console.log(payload.filtersObjectPath)
      newState = selectCategory(state, payload.field, payload.value);
      newState = updateUrl(newState, payload.history, payload.location);
      return newState;
    case UPDATE_INPUT:
      console.log(payload.filtersObjectPath)
      newState = updateInput(state, payload.field, payload.value)
      newState = updateUrl(newState, payload.history, payload.location);
      return newState;
    default:
      return { ...state };
  }
};
