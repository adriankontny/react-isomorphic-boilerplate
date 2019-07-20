const setFilters = (newState, filterOrigin, search) => {
  const filterComponentValues = search;
  return { ...newState, [filterOrigin]: { ...newState[filterOrigin], filterComponentValues} };
}

export default setFilters;