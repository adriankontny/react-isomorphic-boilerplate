export const SET_SEARCH_INPUT = 'search:setSearchInput';
export const UPDATE_SEARCH_SIDE_EFFECTS = 'search:updateSearchSideEffects';

export const LOAD_MORE = 'search:loadMore';
export const LOAD_MORE_DONE = 'search:loadMoreDone';
export const LOAD_MORE_SIDE_EFFECTS = 'search:loadMoreSideEffects';

export const CHANGE_PAGE = 'search:changePage';
export const CHANGE_PAGE_DONE = 'search:changePageDone';
export const CHANGE_PAGE_SIDE_EFFECTS = 'search:changePageSideEffects';

export const TOGGLE_SIDEBAR_LEFT = 'search:toggleSidebarLeft';

export function setSearchInput(value, history, location, filterOrigin) {
  return {
    type: SET_SEARCH_INPUT,
    payload: {
      value, history, location, filterOrigin,
    },
  };
}

export function updateSearchSideEffects(response) {
  return {
    type: UPDATE_SEARCH_SIDE_EFFECTS,
    payload: {
      response,
    },
  };
}

export function loadMore(event, history, location, filterOrigin) {
  return {
    type: LOAD_MORE,
    payload: {
      event, history, location, filterOrigin,
    },
  };
}

export function loadMoreDone(event, history, location, filterOrigin) {
  return {
    type: LOAD_MORE_DONE,
    payload: {
      event, history, location, filterOrigin,
    },
  };
}

export function loadMoreSideEffects(response) {
  return {
    type: LOAD_MORE_SIDE_EFFECTS,
    payload: {
      response,
    },
  };
}

export function changePage(value, history, location, filterOrigin) {
  return {
    type: CHANGE_PAGE,
    payload: {
      value, history, location, filterOrigin,
    },
  };
}

export function changePageSideEffects(value, history, location, filterOrigin) {
  return {
    type: CHANGE_PAGE_SIDE_EFFECTS,
    payload: {
      value, history, location, filterOrigin,
    },
  };
}

export function toggleSidebarLeft() {
  return {
    type: TOGGLE_SIDEBAR_LEFT,
    payload: {},
  };
}
