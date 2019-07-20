export const INITIALIZE_FILTERS = 'filters:initializeFilters';
export const initializeFilters = (history, location, filterOrigin) => {
  return {
    type: INITIALIZE_FILTERS,
    payload: {
      history, location, filterOrigin
    }
  };
};

export const SET_CATEGORY = 'filter:setCategory';
export function setCategory(field, value, history, location, filterOrigin) {
  return {
    type: SET_CATEGORY,
    payload: {
      field, value, history, location, filterOrigin
    }
  }
}

export const SET_FILTER = 'filter:setFilter';
export function setFilter(field, value, history, location, filterOrigin) {
  return {
    type: SET_FILTER,
    payload: {
      field, value, history, location, filterOrigin
    }
  }
}

export const FILTERS_CHANGED = 'filter:filtersChanged';
export function filtersChanged(field, value, history, location, filterOrigin) {
  return {
    type: FILTERS_CHANGED,
    payload: {
      field, value, history, location, filterOrigin
    }
  }
}