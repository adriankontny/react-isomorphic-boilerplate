import {
  INITIALIZE_FILTERS,
  SELECT_CATEGORY,
  UPDATE_INPUT,
} from '../actions/filter-actions';
import { filterBlueprintCategories } from './filter-reducer-data';
import {
  setCategories,
  setFilters,
  
  selectCategory,
  updateInput,
} from './filter-reducer-helpers';

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

  let newState;

  newState = setCategories(state, 'searchFilter', location);
  newState = setFilters(newState, 'searchFilter', location);
 

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
      console.log(payload.field);
      console.log( payload.value);
      newState = selectCategory(newState, payload.field, payload.value, payload.filterOrigin);
      return newState;

    case UPDATE_INPUT:
      newState = updateInput(newState, payload.field, payload.value, payload.filterOrigin);
      return newState;

    default:
      return { ...state };
  }
}
