import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'
import getCategoriesArray from './getCategoriesArray';
import getFiltersArray from './getFiltersArray';

const getLocation = (filterComponent) => {
  const categoriesArray = getCategoriesArray(filterComponent);
  const category = categoriesArray[categoriesArray.length -1].field;

  const filtersArray = getFiltersArray(filterComponent);
  const filters = pickBy(
    filtersArray.reduce((filters, item) => {
      const values = filterComponent.filterComponentValues;
      switch(item.type) {
        case 'range':
          return { 
            ...filters, 
            [`${item.field}:from`]: values[`${item.field}:from`], 
            [`${item.field}:to`]: values[`${item.field}:to`] ,
          };
        default: 
          return { ...filters, [item.field]: values[item.field] };
      }
    }, {}),
    identity
  );

  const location = { search: { ...filters, c: category } };
  return location;
}
export default getLocation