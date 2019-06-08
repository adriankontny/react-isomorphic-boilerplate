
import { filterBlueprintPaths } from '../filter-reducer-data/';
import getItem from './getItem';
import qs from 'qs';
import { produce } from 'immer';
import { toPairs } from 'lodash';

const _categoriesArrayFromUrl = (category, path = [], categoriesArray = []) => {
  categoriesArray = [getItem(category, path), ...categoriesArray];
  const newPath = path.slice(0, -1) || [];
  if (newPath && newPath.length) {
    return _categoriesArrayFromUrl(category, newPath, categoriesArray);
  }
  return categoriesArray.map(item => { return { field: item.field, key: item.value } });
}

const filtersArraysFromUrl = (state, search) => {
  const searchObject = qs.parse(search, { ignoreQueryPrefix: true });
  const path = filterBlueprintPaths[searchObject.c];
  delete searchObject.c;

  const filtersArray = toPairs(searchObject)
    .filter(item => item[1] || false)
    .map(item => {
      return {
        field: item[0],
        value: item[1].split(',')
      };
    }) || [];
  const categoriesArray = path
    ? _categoriesArrayFromUrl(state.filterObject, path)
    : [];
  return [categoriesArray, filtersArray];
}


const filtersArraysToUrl = (state, [categoriesArray, filtersArray], history, location) => {
  const newState = produce(state, draftState => {
    draftState.location.search = {};
    const categoriesLength = categoriesArray.length;
    if (categoriesLength > 0) {
      draftState.location.search.c = categoriesArray[categoriesLength - 1].field;
    }
    filtersArray.forEach(item => {
      draftState.location.search[item.field] = Array.isArray(item.value)
        ? item.value.join(',')
        : item.value || undefined;
    });
  });

  let search = {
    q: qs.parse(location.search, { ignoreQueryPrefix: true }).q || undefined,
    ...newState.location.search
  };

  let searchString = qs.stringify({ ...search }, { encode: true });
  history.replace({ search: searchString });

  return newState;
};

export { filtersArraysFromUrl, filtersArraysToUrl }