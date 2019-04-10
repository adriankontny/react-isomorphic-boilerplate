export const UPDATE_SEARCH = 'search:updateSearch';
export const TOGGLE_SIDEBAR_LEFT = 'search:toggleSidebarLeft';

export function updateSearch(value, history, location) {
  return {
    type: UPDATE_SEARCH,
    payload: {
      value, history, location
    }
  }
}

export function toggleSidebarLeft() {
  return {
    type: TOGGLE_SIDEBAR_LEFT,
    payload: {}
  }
}