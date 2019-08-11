import get from 'lodash/get';
import { filterBlueprintPaths } from '../filter-reducer-data';

const _getCategoriesArray = (category, categoriesArray = []) => {
  const { field, select } = category;
  const path = filterBlueprintPaths[field];
  categoriesArray.push({ field, select, path });

  const subCategory = get(category, `categories[${category.select}]`, {});
  if (get(subCategory, 'categories.length', 0) > 0 && category.select !== '') {
    _getCategoriesArray(subCategory, categoriesArray);
  }
  return categoriesArray;
};

const getCategoriesArray = (filterComponent) => {
  const { filterComponentCategories } = filterComponent;
  return _getCategoriesArray(filterComponentCategories);
};

export default getCategoriesArray;
