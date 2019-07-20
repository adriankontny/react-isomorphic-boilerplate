
import { filterBlueprintPaths } from '../filter-reducer-data';
import produce from 'immer';
import qs from 'qs';

const _setCategory = (category, path) => {
  category.select = typeof path[0] === 'undefined' ? '' : path[0];
  (path || []).length && _setCategory(category.categories[category.select], path.slice(1));
}

const setCategories = (newState, filterOrigin, location) => {
  newState[filterOrigin] = produce(newState[filterOrigin], draftState => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const path = filterBlueprintPaths[search.c] || []
    _setCategory(draftState.filterComponentCategories, path)
  })

  return newState
}

export default setCategories;