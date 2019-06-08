import { filterBlueprintPaths } from '../filter-reducer-data/';
import getItem from './getItem';
import { produce } from 'immer';
import { keys, some } from 'lodash';

const _categoriesArrayFromReduxState = (draftState, draftItem = draftState, categoriesArray = []) => {
  if (draftItem.select !== '') {
    draftItem['categories']
      .forEach((draftItemChild, index) => {
        if (index === draftItem.select) {
          categoriesArray.push({ field: draftItemChild.field, key: index });
          return _categoriesArrayFromReduxState(draftState, draftItemChild, categoriesArray);
        }
      });
  }
  return categoriesArray;
};

const filtersArraysFromReduxState = (draftState) => {
  const categoriesArray = _categoriesArrayFromReduxState(draftState.filterObject);
  const terminalCategory = categoriesArray[categoriesArray.length - 1] || {};
  const draftItem = getItem(draftState.filterObject, filterBlueprintPaths[terminalCategory.field]);

  const filtersArray = keys(draftState.filterValues)
    .map(filter => { return { field: filter, value: draftState.filterValues[filter] } })
    .filter(filter => filter.value)
    .filter(filter => some(draftItem.filters, ['field', filter.field.split(':')[0]]))
  return [categoriesArray, filtersArray];
};

const _categoriesArrayToReduxState = (draftState, categoriesArray, _count = 0) => {
  const path = categoriesArray.map(category => category.key).slice(0, _count + 1);

  const draftItem = getItem(draftState.filterObject, path.slice(0, -1));
  draftItem.select = path.slice(-1)[0];

  if (_count < categoriesArray.length - 1) {
    _categoriesArrayToReduxState(draftState, categoriesArray, ++_count);
  }
}

const filtersArraysToReduxState = (state, [categoriesArray, filtersArray]) => {
  let newState = produce(state, draftState => {
    draftState.categoriesArray = categoriesArray;
    _categoriesArrayToReduxState(draftState, categoriesArray);
    filtersArray.forEach(filter => {
      draftState.filterValues[filter.field] = filter.value;
    });
    delete draftState.filterValues.q
  });
  return newState;
}

export { filtersArraysFromReduxState, filtersArraysToReduxState }