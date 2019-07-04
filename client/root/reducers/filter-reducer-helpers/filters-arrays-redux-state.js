import { filterBlueprintPaths } from '../filter-reducer-data/';
import getItem from './getItem';
import { produce } from 'immer';
import keys from 'lodash/keys';
import some from 'lodash/some';

const _categoriesArrayFromFilterState = (draftState, draftItem = draftState, categoriesArray = []) => {
  if (draftItem.select !== '') {
    draftItem['categories']
      .forEach((draftItemChild, index) => {
        if (index === draftItem.select) {
          categoriesArray.push({ field: draftItemChild.field, key: index });
          return _categoriesArrayFromFilterState(draftState, draftItemChild, categoriesArray);
        }
      });
  }
  return categoriesArray;
};

const filtersArraysFromFilterState = (draftState) => {
  const categoriesArray = _categoriesArrayFromFilterState(draftState.filterComponent);
  const terminalCategory = categoriesArray[categoriesArray.length - 1] || {};
  const draftItem = getItem(draftState.filterComponent, filterBlueprintPaths[terminalCategory.field]);

  const filtersArray = keys(draftState.filterComponentValues)
    .map(filter => { return { field: filter, value: draftState.filterComponentValues[filter] } })
    .filter(filter => filter.value)
    .filter(filter => some(draftItem.filters, ['field', filter.field.split(':')[0]]))
  return [categoriesArray, filtersArray];
};

const _categoriesArrayToFilterState = (draftState, categoriesArray, _count = 0) => {
  const path = categoriesArray.map(category => category.key).slice(0, _count + 1);

  const draftItem = getItem(draftState.filterComponent, path.slice(0, -1));
  draftItem.select = typeof path.slice(-1)[0] === 'undefined'
    ? '' 
    : path.slice(-1)[0];

  if (_count < categoriesArray.length - 1) {
    _categoriesArrayToFilterState(draftState, categoriesArray, ++_count);
  }
}

const filtersArraysToFilterState = (state, [categoriesArray, filtersArray]) => {
  let newState = produce(state, draftState => {
    draftState.categoriesArray = categoriesArray;
    draftState.filtersArray = filtersArray;
    _categoriesArrayToFilterState(draftState, categoriesArray);
    filtersArray.forEach(filter => {
      draftState.filterComponentValues[filter.field] = filter.value;
    });
  });
  return newState;
}

export { filtersArraysFromFilterState, filtersArraysToFilterState }