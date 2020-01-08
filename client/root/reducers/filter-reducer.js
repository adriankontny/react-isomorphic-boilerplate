/* eslint-disable no-case-declarations */
import qs from 'qs';
import {
  SET_FILTER_INITIAL_STATE,
  SET_FILTER_CATEGORY,
  SET_FILTER_INPUT,
} from '../actions/filter-actions';
import { filterBlueprintCategories, filterBlueprintPaths } from './filter-reducer-data';
import {
  getCategory,
  setCategory,
  setFilters,
  setFilter,
} from './filter-reducer-helpers';

export const createFilterReducerPreloadedState = (location) => {
  let state = {
    searchFilter: {
      filterComponentCategories: filterBlueprintCategories,
      filterComponentValues: {},
    },
    uploadFilter: {
      filterComponentCategories: filterBlueprintCategories,
      filterComponentValues: {},
    },
  };

  const search = qs.parse(
    qs.parse(location.search, { ignoreQueryPrefix: true }).searchFilter,
  );
  const path = filterBlueprintPaths[search.c] || [];

  state = setCategory(state, 'searchFilter', path);
  state = setFilters(state, 'searchFilter', search);

  return state;
};

export function filterReducer(
  state,
  { type, payload },
) {
  const { field, value, filterOrigin } = (payload || {});
  let newState = state;
  switch (type) {
    case SET_FILTER_INITIAL_STATE:
      return newState;

    case SET_FILTER_CATEGORY:
      const path = value !== '' ? [...filterBlueprintPaths[field], value] : filterBlueprintPaths[field];
      const category = path.length ? getCategory(newState, filterOrigin, path).field : undefined;
      newState = setFilter(newState, filterOrigin, 'c', category);
      newState = setCategory(newState, filterOrigin, path);
      return newState;

    case SET_FILTER_INPUT:
      return setFilter(newState, filterOrigin, field, value);

    default:
      return { ...newState };
  }
}
