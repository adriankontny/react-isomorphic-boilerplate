
import produce from 'immer';

const _setCategory = (category, path) => {
  category.select = typeof path[0] === 'undefined' ? '' : path[0];
  (path || []).length && (category.select !== '') && _setCategory(category.categories[category.select], path.slice(1));
}

const setCategory = (newState, filterOrigin, path) => {
  const filterComponentCategories = produce(newState[filterOrigin].filterComponentCategories, draftState => {
    _setCategory(draftState, path)
  })

  return { ...newState, [filterOrigin]: { ...newState[filterOrigin], filterComponentCategories} };
}

export default setCategory;