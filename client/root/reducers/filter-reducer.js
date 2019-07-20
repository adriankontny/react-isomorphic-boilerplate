import {
  INITIALIZE_FILTERS,
  SET_CATEGORY,
  SET_FILTER,
} from '../actions/filter-actions';
import { filterBlueprintCategories, filterBlueprintPaths } from './filter-reducer-data';
import qs from 'qs';
import {
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
      const path = [...filterBlueprintPaths[payload.field] || [], payload.value];
      return setCategory(state, filterOrigin, path);

    case SET_FILTER:
      return setFilter(state, filterOrigin, field, value);

    default:
      return { ...state };
  }
}