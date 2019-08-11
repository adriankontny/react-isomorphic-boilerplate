import get from 'lodash/get';
import { filterBlueprintPaths } from '../filter-reducer-data';

const getCategoriesArray = (category, categoriesArray = []) => {
  const { field, select } = category;
  const path = filterBlueprintPaths[field];
  categoriesArray.push({ field, select, path });

  const subCategory = get(category, `categories[${category.select}]`, {});
  if (get(subCategory, 'categories.length', 0) > 0 && category.select !== '') {
    getCategoriesArray(subCategory, categoriesArray);
  }
  return categoriesArray;
};

export default (filterComponent) => {
  const { filterComponentCategories } = filterComponent;
  return getCategoriesArray(filterComponentCategories);
};
