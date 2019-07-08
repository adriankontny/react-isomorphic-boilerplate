import { produce } from 'immer';
import getItem from './getItem';
import { filterBlueprintPaths } from './../filter-reducer-data';

const selectCategory = (state, field, value, filterOrigin) => {
  const filterComponent = produce(state[filterOrigin].filterComponent, draftState => {
    const draftItem = getItem(draftState, filterBlueprintPaths[field]);
    draftItem.select = value;
  });

  const filterComponentCategories = produce(state[filterOrigin].filterComponentCategories, draftState => {
    const draftItem = getItem(draftState, filterBlueprintPaths[field]);
    draftItem.select = value;
  });
  
  return { ...state, [filterOrigin]: { ...state[filterOrigin], filterComponent, filterComponentCategories} };
}

export default selectCategory;