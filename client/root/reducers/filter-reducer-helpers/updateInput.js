import { produce } from 'immer';
import { get, set } from 'lodash';

const updateInput = (state, field, value, filterOrigin) => {
  const filtersArray = produce(state[filterOrigin].filtersArray, draftState => {
    if (value.length === 0) {
      delete draftState[field];
    } else {
      draftState[field] = value;
    }
  });
  return { ...state, [filterOrigin]: { ...state[filterOrigin], filtersArray} };
}

export default updateInput