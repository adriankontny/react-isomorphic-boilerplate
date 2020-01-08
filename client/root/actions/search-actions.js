export const SET_SEARCH_INPUT = 'search:setSearchInput';
export function setSearchInput({ history, filterOrigin }, value) {
  return {
    type: SET_SEARCH_INPUT,
    payload: {
      value, history, filterOrigin,
    },
  };
}

export const ON_SEARCH_CHANGE = 'filter:onSearchChange';
