import { produce } from 'immer';

const setFilter = (state, filterOrigin, field, value = '') => {
  const filterComponentValues = produce(state[filterOrigin].filterComponentValues, (draftState) => {
    if (value.length === 0) {
      delete draftState[field];
    } else {
      draftState[field] = value;
    }
  });
  return { ...state, [filterOrigin]: { ...state[filterOrigin], filterComponentValues } };
};

export default setFilter;
