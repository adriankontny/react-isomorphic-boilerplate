export const TOGGLE_SIDEBAR_LEFT = 'feed:toggleSidebarLeft';

export const UPDATE_QUERY_SIDE_EFFECTS = 'feed:updateQuerySideEffects';

export const LOAD_MORE = 'feed:loadMore';
export const LOAD_MORE_DONE = 'feed:loadMoreDone';
export const LOAD_MORE_SIDE_EFFECTS = 'feed:loadMoreSideEffects';

export const CHANGE_PAGE = 'feed:changePage';
export function toggleSidebarLeft() {
  return {
    type: TOGGLE_SIDEBAR_LEFT,
    payload: {},
  };
}

export function updateQuerySideEffects(response) {
  return {
    type: UPDATE_QUERY_SIDE_EFFECTS,
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

export function changePage(field, value, history, location, filterOrigin) {
  return {
    type: CHANGE_PAGE,
    payload: {
      field, value, history, location, filterOrigin,
    },
  };
}
