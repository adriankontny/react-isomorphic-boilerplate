export const SET_QUERY = 'home:setQuery';

export function setQuery(newQuery) {
  return {
    type: SET_QUERY,
    payload: {
      query: newQuery
    }
  }
}