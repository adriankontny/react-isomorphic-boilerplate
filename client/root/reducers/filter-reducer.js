import {
  INITIALIZE_FILTERS,
  SELECT_CATEGORY,
  UPDATE_INPUT,
} from '../actions/filter-actions';
import { filterBlueprintPaths, filterBlueprintCategories } from './filter-reducer-data';
import {
  selectCategory,
  updateInput,
} from './filter-reducer-helpers';
import produce from 'immer';
import qs from 'qs';

export const createFilterReducerPreloadedState = (location, response) => {
  const state = {
    searchFilter: {
      filterComponentCategories: filterBlueprintCategories,
      filterComponentValues: {},
    },
    uploadFilter: {
      filterComponentCategories: filterBlueprintCategories,
      filterComponentValues: {},
    },
  };
  const newState = state;
 
  newState['searchFilter'] = produce(newState['searchFilter'], draftState => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const path = filterBlueprintPaths[search.c] || []
    const selectCategory = (category, path) => {
      category.select = typeof path[0] === 'undefined' ? '' : path[0];
      (path || []).length && selectCategory(category.categories[category.select], path.slice(1));
    }
    selectCategory(draftState.filterComponentCategories, path)
    draftState.filterComponentValues = search;
  })

  return newState
};

export function filterReducer(
  state,
  { type, payload },
) {
  let newState = state;
  switch (type) {
    
    case INITIALIZE_FILTERS:
      return newState;

    case SELECT_CATEGORY:
      newState = selectCategory(newState, payload.field, payload.value, payload.filterOrigin);
      return newState;

    case UPDATE_INPUT:
      newState = updateInput(newState, payload.field, payload.value, payload.filterOrigin);
      return newState;

    default:
      return { ...state };
  }
}
