export const SET_FILTER_INITIAL_STATE = 'filters:setFilterInitialState';
export const setFilterInitialState = ({ history, location, filterOrigin }) => ({
  type: SET_FILTER_INITIAL_STATE,
  payload: {
    history, location, filterOrigin,
  },
});

export const SET_FILTER_CATEGORY = 'filter:setFilterCategory';
export function setFilterCategory({ history, location, filterOrigin }, field, value ) {
  return {
    type: SET_FILTER_CATEGORY,
    payload: {
      history, location, filterOrigin, field, value,
    },
  };
}

export const SET_FILTER_INPUT = 'filter:setFilterInput';
export function setFilterInput({ history, location, filterOrigin }, field, value) {
  return {
    type: SET_FILTER_INPUT,
    payload: {
      history, location, filterOrigin, field, value,
    },
  };
}

export const ON_FILTERS_CHANGE = 'filter:onFiltersChange';
