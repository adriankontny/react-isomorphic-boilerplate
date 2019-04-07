export const INITIALIZE_FILTERS = 'filters:initializeFilters';
export const initializeFilters = (location, history) => {
  return {
    type: INITIALIZE_FILTERS,
    payload: {
      location, history
    }
  };
};

export const SELECT_CATEGORY = 'filter:selectCategory';
export function selectCategory(field, value, location, history) {
  return {
    type: SELECT_CATEGORY,
    payload: {
      field, value, location, history
    }
  }
}

export const UPDATE_INPUT = 'filter:updateInput';
export function updateInput(field, value, location, history) {
  return {
    type: UPDATE_INPUT,
    payload: {
      field, value, location, history
    }
  }
}