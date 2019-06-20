import {
  INITIALIZE_FILTERS,
  SELECT_CATEGORY,
  UPDATE_INPUT,
} from '../actions/filter-actions';
import { filterBlueprint, filterBlueprintPaths } from './filter-reducer-data';
import {
  selectCategory,
  updateInput,
  filtersArraysFromUrl,
  filtersArraysToUrl,
  filtersArraysFromReduxState,
  filtersArraysToReduxState,
} from './filter-reducer-helpers';

const updateUrl = (state, history, location) => {
  const [categoriesArray, filtersArray] = filtersArraysFromReduxState(state['searchFilter']);
  const searchFilterState = filtersArraysToUrl(state['searchFilter'], [categoriesArray, filtersArray], history, location);
  return { ...state, searchFilter: searchFilterState };
};

export const createFilterReducerPreloadedState = (location, response) => {
  const state = {
    searchFilter: {
      filterObject: filterBlueprint,
      location: {},
      filterValues: {},
      categoriesArray: [],
    },
    uploadFilter: {
      filterObject: filterBlueprint,
      location: {},
      filterValues: {},
      categoriesArray: [],
    },
  };
  const [categoriesArray, filtersArray] = filtersArraysFromUrl(state['searchFilter'], location.search);
  const searchFilterState = filtersArraysToReduxState(state['searchFilter'], [categoriesArray, filtersArray]);
  return { ...state, searchFilter: searchFilterState };
};

export function filterReducer(
  state,
  { type, payload },
) {
  let newState;
  switch (type) {
    
    case INITIALIZE_FILTERS:
      newState = state;
      newState = updateUrl(newState, payload.history, payload.location);
      return newState;

    case SELECT_CATEGORY:
      newState = state;
      newState = selectCategory(newState, payload.field, payload.value, payload.filterOrigin);
      newState = updateUrl(newState, payload.history, payload.location);
      return newState;

    case UPDATE_INPUT:
      newState = state;
      newState = updateInput(newState, payload.field, payload.value, payload.filterOrigin);
      newState = updateUrl(newState, payload.history, payload.location);
      return newState;

    default:
      return { ...state };
  }
}
