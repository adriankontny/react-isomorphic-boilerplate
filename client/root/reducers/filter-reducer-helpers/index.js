import get from 'lodash/get'
import getItem from './getItem';
import selectCategory from './selectCategory';
import updateInput from './updateInput';
import { filterBlueprint, filterBlueprintPaths, filterBlueprintCategories } from '../filter-reducer-data';

const _getCategoriesArray = (category, categoriesArray = []) => {
  const {field, select} = category
  const path = filterBlueprintPaths[field];
  categoriesArray.push({field, select, path})
  
  const subCategory = get(category, `categories[${category.select}]`, {})
  if (get(subCategory, 'categories.length', 0) > 0 && category.select !== '') {
    _getCategoriesArray(subCategory, categoriesArray);
  }
  return categoriesArray
}

const getCategoriesArray = (filterComponent) => {
  const filterComponentCategories = filterComponent.filterComponentCategories
  return _getCategoriesArray(filterComponentCategories)
}

const _getFiltersArray = (filterComponentCategories) => {
  const categoriesArray = _getCategoriesArray(filterComponentCategories)
  const path = (categoriesArray.slice(-1)[0] || []).path
  const filters = getItem(filterBlueprint, path).filters;

  const filtersArray = filters.map(filter => ({
    field: filter.field,
    type: filter.type,
  }));

  return filtersArray;
}

const getFiltersArray = (filterComponent) => 
  _getFiltersArray(filterComponent.filterComponentCategories, filterComponent.filterComponentValues)

export {
  getItem,
  selectCategory,
  getCategoriesArray,
  getFiltersArray,

  updateInput,
};