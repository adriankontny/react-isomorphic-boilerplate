import { produce } from 'immer';
import get from 'lodash/get';
import set from 'lodash/set';

const updateInput = (state, field, value, filterOrigin) => {
  const filterValues = produce(state[filterOrigin].filterValues, draftState => {
    if (value.length === 0) {
      delete draftState[field];
    } else {
      draftState[field] = value;
    }
  });
  return { ...state, [filterOrigin]: { ...state[filterOrigin], filterValues} };
}

export default updateInput