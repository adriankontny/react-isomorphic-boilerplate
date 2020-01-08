export const SET_FILTER_INITIAL_STATE = 'filters:setFilterInitialState';
export const setFilterInitialState = (history, location, filterOrigin) => ({
  type: SET_FILTER_INITIAL_STATE,
  payload: {
    history, location, filterOrigin,
  },
});

export const SET_FILTER_CATEGORY = 'filter:setFilterCategory';
export function setFilterCategory(field, value, history, location, filterOrigin) {
  return {
    type: SET_FILTER_CATEGORY,
    payload: {
      field, value, history, location, filterOrigin,
    },
  };
}

export const SET_FILTER_INPUT = 'filter:setFilterInput';
export function setFilterInput(field, value, history, location, filterOrigin) {
  return {
    type: SET_FILTER_INPUT,
    payload: {
      field, value, history, location, filterOrigin,
    },
  };
}

export const ON_FILTERS_CHANGE = 'filter:onFiltersChange';
export function onFiltersChange(field, value, history, location, filterOrigin) {
  return {
    type: ON_FILTERS_CHANGE,
    payload: {
      field, value, history, location, filterOrigin,
    },
  };
}
