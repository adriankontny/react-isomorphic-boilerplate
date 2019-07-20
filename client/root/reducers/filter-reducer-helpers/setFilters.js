
import produce from 'immer';
import qs from 'qs';

const setFilters = (newState, filterOrigin, location) => {
  newState[filterOrigin] = produce(newState[filterOrigin], draftState => {
    const search = qs.parse(search, { ignoreQueryPrefix: true });
    draftState.filterComponentValues = search;
  })

  return newState
}

export default setFilters;