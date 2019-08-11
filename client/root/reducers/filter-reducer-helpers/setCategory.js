/* eslint-disable no-param-reassign */
import produce from 'immer';

const setCategory = (category, path = []) => {
  category.select = typeof path[0] === 'undefined' ? '' : path[0];
  if (path.length && category.select !== '') {
    setCategory(category.categories[category.select], path.slice(1));
  }
};

export default (newState, filterOrigin, path) => {
  const filterComponentCategories = produce(
    newState[filterOrigin].filterComponentCategories,
    (draftState) => {
      setCategory(draftState, path);
    },
  );

  return { ...newState, [filterOrigin]: { ...newState[filterOrigin], filterComponentCategories } };
};
