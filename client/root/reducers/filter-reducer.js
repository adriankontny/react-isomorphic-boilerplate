import {
  INITIALIZE_FILTERS,
  SELECT_CATEGORY,
  UPDATE_INPUT,
} from '../actions/filter-actions';
import { filterBlueprint, filterBlueprintPaths, filterBlueprintCategories } from './filter-reducer-data';
import {
  getItem,
  selectCategory,
  updateInput,
  filtersArraysFromUrl,
  filtersArraysToUrl,
  filtersArraysFromFilterState,
  filtersArraysToFilterState,
} from './filter-reducer-helpers';
import produce, {original} from 'immer';
import qs from 'qs';

const updateArrays = (state, history, location) => {
  const [categoriesArray, filtersArray] = filtersArraysFromFilterState(state['searchFilter']);
  const searchFilterState = filtersArraysToUrl(state['searchFilter'], [categoriesArray, filtersArray], history, location);
  return { ...state, searchFilter: {...searchFilterState, categoriesArray, filtersArray} };
};

export const createFilterReducerPreloadedState = (location, response) => {
  const state = {
    searchFilter: {
      filterComponentCategories: filterBlueprintCategories,
      filterComponentValues: {},
      filterComponent: filterBlueprint,
      location: {}
    },
    uploadFilter: {
      filterComponentCategories: filterBlueprintCategories,
      filterComponentValues: {},
      filterComponent: filterBlueprint,
      location: {}
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

  const [categoriesArray, filtersArray] = filtersArraysFromUrl(newState['searchFilter'], location.search);
  const searchFilterState = filtersArraysToFilterState(newState['searchFilter'], [categoriesArray, filtersArray]);
  return { ...state, searchFilter: searchFilterState };
};

export function filterReducer(
  state,
  { type, payload },
) {
  let newState = state;
  switch (type) {
    
    case INITIALIZE_FILTERS:
      newState = updateArrays(newState, payload.history, payload.location);
      return newState;

    case SELECT_CATEGORY:
      newState = selectCategory(newState, payload.field, payload.value, payload.filterOrigin);

      const getCategoriesArray = (filterComponentCategories, categoriesArray = []) => {
        const {categories, select} = filterComponentCategories;
        if (categories && select !== '') {
          const { field } = categories[select];
          const value = select;
          const path = filterBlueprintPaths[field];
          categoriesArray.push({field, value, path});
          getCategoriesArray(categories[select], categoriesArray);
        }
        return categoriesArray
      }

      const getFiltersArray = (filterComponentCategories, filterComponentValues) => {
        const categoriesArray = getCategoriesArray(filterComponentCategories)
        const path = (categoriesArray.slice(-1)[0] || []).path
        const filters = getItem(filterBlueprint, path).filters;

        const filtersArray = filters.map(filter => ({
          field: filter.field,
          type: filter.type,
        }));

        return filtersArray;
      }

      const { filterComponentCategories, filterComponentValues ,categoriesArray,  } = newState[payload.filterOrigin]

      console.log(categoriesArray)
      console.log(getCategoriesArray(filterComponentCategories));
      // console.log(getFiltersArray(filterComponentCategories, filterComponentValues));
      
      // newState = updateArrays(newState, payload.history, payload.location);
      return newState;

    case UPDATE_INPUT:
      newState = updateInput(newState, payload.field, payload.value, payload.filterOrigin);
      // newState = updateArrays(newState, payload.history, payload.location);
      return newState;

    default:
      return { ...state };
  }
}
