export const UPDATE_SEARCH = 'search:updateSearch';
export const LOAD_MORE = 'search:loadMore';
export const TOGGLE_SIDEBAR_LEFT = 'search:toggleSidebarLeft';

export function updateSearch(value, history, location, filterOrigin) {
  return {
    type: UPDATE_SEARCH,
    payload: {
      value, history, location, filterOrigin
    }
  }
}

export function loadMore(event, history, location, filterOrigin) {
  return {
    type: LOAD_MORE,
    payload: {
      event, history, location, filterOrigin
    }
  }
}

export function toggleSidebarLeft() {
  return {
    type: TOGGLE_SIDEBAR_LEFT,
    payload: {}
  }
}