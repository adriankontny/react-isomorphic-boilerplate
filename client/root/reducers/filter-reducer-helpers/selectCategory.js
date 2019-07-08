import { produce } from 'immer';
import getItem from './getItem';
import { filterBlueprintPaths } from './../filter-reducer-data';

const selectCategory = (state, field, value, filterOrigin) => {
  const filterComponentCategories = produce(state[filterOrigin].filterComponentCategories, draftState => {
    const draftItem = getItem(draftState, filterBlueprintPaths[field]);
    draftItem.select = value;
  });
  
  return { ...state, [filterOrigin]: { ...state[filterOrigin], filterComponentCategories} };
}

export default selectCategory;