export const INITIALIZE_FILTERS = 'filters:initializeFilters';
export const initializeFilters = (history, location) => {
  return {
    type: INITIALIZE_FILTERS,
    payload: {
      history, location
    }
  };
};

export const SELECT_CATEGORY = 'filter:selectCategory';
export function selectCategory(field, value, history, location) {
  return {
    type: SELECT_CATEGORY,
    payload: {
      field, value, history, location
    }
  }
}

export const UPDATE_INPUT = 'filter:updateInput';
export function updateInput(field, value, history, location) {
  return {
    type: UPDATE_INPUT,
    payload: {
      field, value, history, location
    }
  }
}