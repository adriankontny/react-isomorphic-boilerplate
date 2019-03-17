export const SELECT_CATEGORY = 'filter:selectCategory';
export function selectCategory(item, value) {
  return {
    type: SELECT_CATEGORY,
    payload: {
      item, value
    }
  }
}

export const UPDATE_INPUT = 'filter:updateInput';
export function updateInput(item, value) {
  return {
    type: UPDATE_INPUT,
    payload: {
      item, value
    }
  }
}