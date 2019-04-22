import { produce } from 'immer';
import { get, set } from 'lodash';

const updateInput = (state, field, value, filtersObjectPath) => {
  const filterValues = produce(state.filterValues, draftState => {
    if (value.length === 0) {
      delete draftState[field];
    } else {
      draftState[field] = value;
    }
  });
  return { ...state, filterValues }

  // const filters = produce(state.filters, draftState => {
  //   const draftFilter = get(draftState, filtersObjectPath, { search: {} });
  //   set(draftState, filtersObjectPath, draftFilter);
  //   if (value.length === 0) {
  //     delete draftFilter.search[field];
  //   } else {
  //     draftFilter.search[field] = value;
  //   }
  // });
}

export default updateInput