export const SET_SEARCH = 'search:setSearch';

export function setSearch(newSearch) {
  return {
    type: SET_SEARCH,
    payload: {
      search: newSearch
    }
  }
}