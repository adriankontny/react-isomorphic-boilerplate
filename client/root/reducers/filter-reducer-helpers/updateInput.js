import { produce } from 'immer';

const updateInput = (state, field, value) => {
  const filterValues = produce(state.filterValues, draftState => {
    if (value.length === 0) {
      delete draftState[field];
    } else {
      draftState[field] = value;
    }
  });
  return { ...state, filterValues }
}

export default updateInput