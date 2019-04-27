import { produce } from 'immer';
import { get, set } from 'lodash';

const updateInput = (state, field, value, filtersObjectPath) => {
  const filterValues = produce(state[filtersObjectPath].filterValues, draftState => {
    if (value.length === 0) {
      delete draftState[field];
    } else {
      draftState[field] = value;
    }
  });
  return { ...state, [filtersObjectPath]: { ...state[filtersObjectPath], filterValues} };
}

export default updateInput