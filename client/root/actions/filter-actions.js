export const SELECT_CATEGORY = 'filter:selectCategory';
export function selectCategory(field, value) {
  return {
    type: SELECT_CATEGORY,
    payload: {
      field, value
    }
  }
}

export const SELECT_MULTISELECT = 'filter:selectMultiselect';
export function selectMultiselect(filter, value) {
  return {
    type: SELECT_MULTISELECT,
    payload: {
      filter, value
    }
  }
}

export const UPDATE_INPUT = 'filter:updateInput';
export function updateInput(field, value) {
  return {
    type: UPDATE_INPUT,
    payload: {
      field, value
    }
  }
}