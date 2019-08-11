import pick from 'lodash/pick';
import { getItem } from './getCategory';
import { filterBlueprint } from '../filter-reducer-data';
import getCategoriesArray from './getCategoriesArray';

const getFiltersArray = (filterComponent) => {
  const categoriesArray = getCategoriesArray(filterComponent);
  const { path } = categoriesArray.slice(-1)[0] || [];
  const { filters } = getItem(filterBlueprint, path);

  return filters.map((filter) => pick(filter, ['field', 'type', 'items', 'label']));
};

export default getFiltersArray;
