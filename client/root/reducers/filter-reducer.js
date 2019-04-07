import {
  INITIALIZE_FILTERS,
  SELECT_CATEGORY,
  UPDATE_INPUT
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
import { get, keys, some, toPairs } from 'lodash';

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

const _categoriesArrayFromUrl = (category, path = [], categoriesArray = []) => {
  categoriesArray = [getItem(category, path), ...categoriesArray];
  const newPath = path.slice(0, -1) || [];
  if ( newPath && newPath.length ) {
    return _categoriesArrayFromUrl(category, newPath, categoriesArray);
  }
  return categoriesArray.map(item => { return {field: item.field, key: item.value } });
}

const filtersArraysFromUrl = (state, search) => {
  const searchObject = qs.parse(search, { ignoreQueryPrefix: true });
  const path = paths[searchObject.c];
  delete searchObject.c;

  const filtersArray = toPairs(searchObject)
    .map(item => {
      return { 
        field: item[0],
        value: (item[1].split(',').length === 1 
        ? item[1] 
        : item[1].split(',')) 
      };
    }) || [];
  const categoriesArray = _categoriesArrayFromUrl(state.category, path);

  return [categoriesArray, filtersArray];
}

const updateUrl = (state, location, history) => {
  const [categoriesArray, filtersArray] = filtersArraysFromReduxState(state);
  console.log(categoriesArray)
  console.log(filtersArray)
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
    case INITIALIZE_FILTERS:
      const [categoriesArray, filtersArray] = filtersArraysFromUrl(state, payload.location.search);
      console.log(categoriesArray)
      console.log(filtersArray)
      // newState = filtersArraysToReduxState(state, [filtersArray, filtersArrayExternal]);
      // newState = updateUrl(newState, payload.history, payload.location);
      return state;
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
