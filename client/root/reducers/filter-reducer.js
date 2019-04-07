import {
  SELECT_CATEGORY, UPDATE_INPUT
} from '../actions/filter-actions'
import {category, paths} from './filter-reducer-data/';
import {
  getItem,
  selectCategory,
  // setFilters,
  // setFiltersExternal,
  // toggleExpander,
  // searchItems,
  updateInput,
  // filtersArraysFromUrl,
  // filtersArraysToUrl,
  // filtersArraysFromReduxState,
  // filtersArraysToReduxState,
} from './filter-reducer-helpers/';
import qs from 'qs';
import { produce, original } from 'immer';
import { get, keys, some } from 'lodash';


const _categoriesArrayFromReduxState = (draftState, draftItem = draftState, categoriesArray = []) => {
  if ( draftItem.select !== '' ) {
    draftItem['categories']
    .forEach((draftItemChild, index) => {
      if(index === draftItem.select) {
        categoriesArray.push({field: draftItemChild.field, key: index});
        return _categoriesArrayFromReduxState(draftState, draftItemChild, categoriesArray);
      }
    });
  }
  return categoriesArray;
};

const filtersArraysFromReduxState = (draftState) => {
  const categoriesArray = _categoriesArrayFromReduxState(draftState.category);
  const terminalCategory = categoriesArray[categoriesArray.length -1] || {};
  const draftItem = getItem(draftState.category, paths[terminalCategory.field]);
  //const draftItemFilters = draftItem.filters.map(filter => filter.field);

  const filtersArray = keys(draftState.filterValues)
    .map(filter => {return{field: filter, value: draftState.filterValues[filter]}})
    .filter(filter => filter.value)
    .filter(filter => some(draftItem.filters, ['field', filter.field.split(':')[0]]))
  return [categoriesArray, filtersArray];
};

const filtersArraysToUrl = (state, [categoriesArray, filtersArray], location, history ) => {
  const newState = produce(state, draftState => {
    draftState.location.search = {};
    const categoriesLength = categoriesArray.length;
    if (categoriesLength > 0) {
      draftState.location.search.c = categoriesArray[categoriesLength-1].field;
    }
    filtersArray.forEach(item => {
      draftState.location.search[item.field] = Array.isArray(item.value) ? item.value.join(',') : item.value;
    });
  });

  let search = {
    q: qs.parse(location.search, { ignoreQueryPrefix: true }).q,
    ...newState.location.search
  };

  search = qs.stringify({ ...search }, { encode: true });
  history.replace({search});

  return newState;
};

const updateUrl = (state, location, history) => {
  const [categoriesArray, filtersArray] = filtersArraysFromReduxState(state);
  return filtersArraysToUrl(state, [categoriesArray, filtersArray], location, history);
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
    case SELECT_CATEGORY:
      newState = selectCategory(state, payload.field, payload.value);
      newState = updateUrl(newState, payload.location, payload.history);
      return newState;
    case UPDATE_INPUT:
      newState = updateInput(state, payload.field, payload.value)
      newState = updateUrl(newState, payload.location, payload.history);
      return newState;
    default:
      return { ...state };
  }
};
