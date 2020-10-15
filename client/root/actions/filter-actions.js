export const SET_FILTER_INITIAL_STATE = 'filters:setFilterInitialState';
export const setFilterInitialState = ({ history, filterOrigin }) => ({
  type: SET_FILTER_INITIAL_STATE,
  payload: {
    history, filterOrigin,
  },
});

export const SET_FILTER_CATEGORY = 'filter:setFilterCategory';
export function setFilterCategory({ history, filterOrigin }, field, value ) {
  return {
    type: SET_FILTER_CATEGORY,
    payload: {
      history, filterOrigin, field, value,
    },
  };
}

export const SET_FILTER_INPUT = 'filter:setFilterInput';
export function setFilterInput({ history, filterOrigin }, field, value) {
  return {
    type: SET_FILTER_INPUT,
    payload: {
      history, filterOrigin, field, value,
    },
  };
}

export const ON_FILTERS_CHANGE = 'filter:onFiltersChange';
export function onFiltersChange({ history, filterOrigin }, field, value) {
  return {
    type: ON_FILTERS_CHANGE,
    payload: {
      history, filterOrigin, field, value,
    },
  };
}
