import {
  INITIALIZE_FILTERS,
  SET_CATEGORY,
  SET_FILTER,
} from '../actions/filter-actions';
import { filterBlueprintCategories, filterBlueprintPaths } from './filter-reducer-data';
import qs from 'qs';
import {
  getCategory,
  setCategory,
  setFilters,
  setFilter,
} from './filter-reducer-helpers';
export const createFilterReducerPreloadedState = (location, response) => {
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
  const search = qs.parse(location.search, { ignoreQueryPrefix: true });
  const path = filterBlueprintPaths[search.c] || [];

  state = setCategory(state, 'searchFilter', path);
  state = setFilters(state, 'searchFilter', search);
 
  return state;
};

export function filterReducer(
  state,
  { type, payload },
) {
  let { field, value, filterOrigin } = (payload || {});
  switch (type) {
    
    case INITIALIZE_FILTERS:
      return state;

    case SET_CATEGORY:
      let newState = state;
      const path = value !== '' ? [...filterBlueprintPaths[field], value] : filterBlueprintPaths[field]
      const category = path.length ? getCategory(newState, filterOrigin, path).field : undefined;
      newState = setFilter(newState, filterOrigin, 'c', category);
      newState = setCategory(newState, filterOrigin, path);
      return newState;

    case SET_FILTER:
      return setFilter(state, filterOrigin, field, value);

    default:
      return { ...state };
  }
}