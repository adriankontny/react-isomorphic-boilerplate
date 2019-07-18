import pick from 'lodash/pick'
import identity from 'lodash/identity'
import getItem from './getItem';
import { filterBlueprint } from '../filter-reducer-data';
import getCategoriesArray from './getCategoriesArray';

const getFiltersArray = (filterComponent) => {
  const categoriesArray = getCategoriesArray(filterComponent)
  const path = (categoriesArray.slice(-1)[0] || []).path
  const filters = getItem(filterBlueprint, path).filters;

  return filters.map(filter => pick(filter, ['field', 'type', 'items', 'label']));
}

export default getFiltersArray