export const SELECT_CATEGORY = 'filter:selectCategory';
export function selectCategory(category, value) {
  return {
    type: SELECT_CATEGORY,
    payload: {
      category, value
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