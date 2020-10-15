export const SET_SEARCH_INPUT = 'search:setSearchInput';
export function setSearchInput({ history, filterOrigin }, value) {
  return {
    type: SET_SEARCH_INPUT,
    payload: {
      value, history, filterOrigin,
    },
  };
}

export const ON_SEARCH_CHANGE = 'search:onSearchChange';
export function onSearchChange({ history, filterOrigin }, field, value) {
  return {
    type: ON_SEARCH_CHANGE,
    payload: {
      history, filterOrigin, value, field,
    },
  };
}
