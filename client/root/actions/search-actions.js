export const UPDATE_SEARCH = 'search:updateSearch';
export const UPDATE_SEARCH_SIDE_EFFECTS = 'search:updateSearchSideEffects';

export const LOAD_MORE = 'search:loadMore';
export const LOAD_MORE_DONE = 'search:loadMoreDone';
export const LOAD_MORE_SIDE_EFFECTS = 'search:loadMoreSideEffects';

export const TOGGLE_SIDEBAR_LEFT = 'search:toggleSidebarLeft';

export function updateSearch(value, history, location, filterOrigin) {
  return {
    type: UPDATE_SEARCH,
    payload: {
      value, history, location, filterOrigin
    }
  }
}

export function updateSearchSideEffects(response) {
  return {
    type: UPDATE_SEARCH,
    payload: {
      response
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

export function loadMoreDone(event, history, location, filterOrigin) {
  return {
    type: LOAD_MORE_DONE,
    payload: {
      event, history, location, filterOrigin
    }
  }
}

export function loadMoreSideEffects(response) {
  return {
    type: LOAD_MORE_SIDE_EFFECTS,
    payload: {
      response
    }
  }
}

export function toggleSidebarLeft() {
  return {
    type: TOGGLE_SIDEBAR_LEFT,
    payload: {}
  }
}