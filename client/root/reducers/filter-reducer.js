import {
  INITIALIZE_FILTERS,
  SELECT_CATEGORY,
  UPDATE_INPUT
} from '../actions/filter-actions'
import { category, paths } from './filter-reducer-data/';
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

export default function filterReducer(
  state = {
    category,
    location: {},
    filterValues: {},
  },
  { type, payload }) { // action: { type, payload }
  let newState;
  switch (type) {
    case INITIALIZE_FILTERS:
      const [categoriesArray, filtersArray] = filtersArraysFromUrl(state, payload.location.search);
      newState = filtersArraysToReduxState(state, [categoriesArray, filtersArray]);
      return newState;
    case SELECT_CATEGORY:
      newState = selectCategory(state, payload.field, payload.value);
      newState = updateUrl(newState, payload.history, payload.location);
      return newState;
    case UPDATE_INPUT:
      newState = updateInput(state, payload.field, payload.value)
      newState = updateUrl(newState, payload.history, payload.location);
      return newState;
    default:
      return { ...state };
  }
};
