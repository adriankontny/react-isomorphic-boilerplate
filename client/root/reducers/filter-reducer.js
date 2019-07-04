import {
  INITIALIZE_FILTERS,
  SELECT_CATEGORY,
  UPDATE_INPUT,
} from '../actions/filter-actions';
import { filterBlueprint } from './filter-reducer-data';
import {
  selectCategory,
  updateInput,
  filtersArraysFromUrl,
  filtersArraysToUrl,
  filtersArraysFromFilterState,
  filtersArraysToFilterState,
} from './filter-reducer-helpers';

const updateArrays = (state, history, location) => {
  const [categoriesArray, filtersArray] = filtersArraysFromFilterState(state['searchFilter']);
  const searchFilterState = filtersArraysToUrl(state['searchFilter'], [categoriesArray, filtersArray], history, location);
  return { ...state, searchFilter: {...searchFilterState, categoriesArray, filtersArray} };
};

export const createFilterReducerPreloadedState = (location, response) => {
  const state = {
    searchFilter: {
      filterComponent: filterBlueprint,
      filterComponentValues: {},
      location: {},
      filtersArray: [],
      categoriesArray: [],
    },
    uploadFilter: {
      filterComponent: filterBlueprint,
      filterComponentValues: {},
      location: {},
      filtersArray: [],
      categoriesArray: [],
    },
  };
  const [categoriesArray, filtersArray] = filtersArraysFromUrl(state['searchFilter'], location.search);
  const searchFilterState = filtersArraysToFilterState(state['searchFilter'], [categoriesArray, filtersArray]);
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
      newState = updateArrays(newState, payload.history, payload.location);
      return newState;

    case SELECT_CATEGORY:
      newState = state;
      newState = selectCategory(newState, payload.field, payload.value, payload.filterOrigin);
      newState = updateArrays(newState, payload.history, payload.location);
      return newState;

    case UPDATE_INPUT:
      newState = state;
      newState = updateInput(newState, payload.field, payload.value, payload.filterOrigin);
      newState = updateArrays(newState, payload.history, payload.location);
      return newState;

    default:
      return { ...state };
  }
}
