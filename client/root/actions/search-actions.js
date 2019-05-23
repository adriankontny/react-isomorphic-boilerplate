export const UPDATE_SEARCH = 'search:updateSearch';
export const TOGGLE_SIDEBAR_LEFT = 'search:toggleSidebarLeft';

export function updateSearch(value, history, location, filtersObjectPath) {
  return {
    type: UPDATE_SEARCH,
    payload: {
      value, history, location, filtersObjectPath
    }
  }
}

export function toggleSidebarLeft() {
  return {
    type: TOGGLE_SIDEBAR_LEFT,
    payload: {}
  }
}