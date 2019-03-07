export const SELECT_DROPDOWN = 'filter:selectDropdown';

export function selectDropdown(item, value) {
  return {
    type: SELECT_DROPDOWN,
    payload: {
      item, value
    }
  }
}