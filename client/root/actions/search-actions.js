export const UPDATE_SEARCH = 'search:updateSearch';
export const TOGGLE_SIDEBAR_LEFT = 'search:toggleSidebarLeft';

export function updateSearch(value, location, history) {
  return {
    type: UPDATE_SEARCH,
    payload: {
      value, location, history
    }
  }
}

export function toggleSidebarLeft() {
  return {
    type: TOGGLE_SIDEBAR_LEFT,
    payload: {}
  }
}