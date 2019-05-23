import {
  UPDATE_SEARCH,
  TOGGLE_SIDEBAR_LEFT
} from '../actions/search-actions'
import qs from 'qs';

const updateUrl = (state, history, location) => {

  let search = {
    ...qs.parse(location.search, { ignoreQueryPrefix: true }),
    q: state.search
  }

  let searchString = qs.stringify({ ...search }, { encode: true });
  history.replace({ search: searchString });

  return state;
}

export default function searchReducer(
  state = {
    search: '',
    sidebarLeftIsVisible: false
  },
  { type, payload }) { // action: { type, payload }
  let newState;
  switch (type) {
    case UPDATE_SEARCH:
      newState = updateUrl( { ...state, search: payload.value }, payload.history, payload.location );
      return newState
    case TOGGLE_SIDEBAR_LEFT:
      return { ...state, sidebarLeftIsVisible: !state.sidebarLeftIsVisible };
    default:
      return { ...state };
  }
};
