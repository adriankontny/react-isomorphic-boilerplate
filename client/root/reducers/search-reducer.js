import {
  UPDATE_SEARCH,
  TOGGLE_SIDEBAR_LEFT
} from '../actions/search-actions'

export default function searchReducer(
  state = {
    search: '',
    sidebarLeftIsVisible: false
  },
  { type, payload }) { // action: { type, payload }
  switch (type) {
    case UPDATE_SEARCH:
      return { ...state, search: payload.value };
    case TOGGLE_SIDEBAR_LEFT:
      return { ...state, sidebarLeftIsVisible: !state.sidebarLeftIsVisible };
    default:
      return { ...state };
  }
};
