import {
  INITIALIZE_FILTERS,
  SELECT_CATEGORY,
  UPDATE_INPUT,
} from '../actions/filter-actions';
import { filterBlueprint, filterBlueprintPaths } from './filter-reducer-data';
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
} from './filter-reducer-helpers';
import qs from 'qs';
import { produce, original } from 'immer';
import { get, keys, some, toPairs } from 'lodash';


const updateUrl = (state, history, location) => {
  const [categoriesArray, filtersArray] = filtersArraysFromReduxState(state['feed']);
  const feedState = filtersArraysToUrl(state['feed'], [categoriesArray, filtersArray], history, location);
  return { ...state, feed: feedState };
};

const filtersObjectPaths = ['feed', 'upload'];

export const createFilterReducerPreloadedState = (location) => {
  const state = {
    feed: {
      filterObject: filterBlueprint,
      location: {},
      filterValues: {},
    },
    upload: {
      filterObject: filterBlueprint,
      location: {},
      filterValues: {},
    },
  };
  const [categoriesArray, filtersArray] = filtersArraysFromUrl(state['feed'], location.search);
  const feedState = filtersArraysToReduxState(state['feed'], [categoriesArray, filtersArray]);
  return { ...state, feed: feedState };
};

export function filterReducer(
  state = {},
  { type, payload },
) { // action: { type, payload }
  let newState;
  switch (type) {
    case 'PING':
      return state;

    case INITIALIZE_FILTERS:
      // todo: check cache, etc
      if (process.env.NODE_ENV !== 'production' && module.hot) {
        return createFilterReducerPreloadedState(payload.location);
      }
      return state;
    case SELECT_CATEGORY:
      newState = state;
      newState = selectCategory(newState, payload.field, payload.value, payload.filtersObjectPath);
      newState = updateUrl(newState, payload.history, payload.location);
      return newState;
    case UPDATE_INPUT:
      newState = state;
      newState = updateInput(newState, payload.field, payload.value, payload.filtersObjectPath)
      newState = updateUrl(newState, payload.history, payload.location);
      return newState;
    default:
      return { ...state };
  }
}
