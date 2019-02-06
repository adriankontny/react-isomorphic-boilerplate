export const UPDATE_SEARCH = 'search:updateSearch';
export const TOGGLE_SIDEBAR_LEFT = 'search:toggleSidebarLeft';

export function updateSearch(value) {
  return {
    type: UPDATE_SEARCH,
    payload: {
      search: value
    }
  }
}

export function toggleSidebarLeft(value) {
  return {
    type: TOGGLE_SIDEBAR_LEFT,
    payload: {
      sidebarLeftIsVisible: value
    }
  }
}