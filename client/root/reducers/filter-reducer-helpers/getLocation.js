import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import getFiltersArray from './getFiltersArray';

const getLocation = (state, filterOrigin) => {
  const filterComponent = state[filterOrigin];

  const category = filterComponent.filterComponentValues.c;

  const filtersArray = getFiltersArray(filterComponent);
  const filters = pickBy(
    filtersArray.reduce((filtersAcc, item) => {
      const values = filterComponent.filterComponentValues;
      switch (item.type) {
        case 'range':
          return {
            ...filtersAcc,
            [`${item.field}:from`]: values[`${item.field}:from`],
            [`${item.field}:to`]: values[`${item.field}:to`],
          };
        default:
          return { ...filtersAcc, [item.field]: values[item.field] };
      }
    }, {}),
    identity,
  );

  const location = { search: { ...filters, c: category } };
  return location;
};
export default getLocation;
