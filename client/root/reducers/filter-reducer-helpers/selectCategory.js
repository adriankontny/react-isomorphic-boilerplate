import { produce } from 'immer';
import getItem from './getItem';
import { get, set } from 'lodash';
import { filterBlueprintPaths } from './../filter-reducer-data';

const selectCategory = (state, field, value, filterOrigin) => {
  const filterObject = produce(state[filterOrigin].filterObject, draftState => {
    const draftItem = getItem(draftState, filterBlueprintPaths[field]);
    draftItem.select = value;
  });
  
  return { ...state, [filterOrigin]: { ...state[filterOrigin], filterObject} };
}

export default selectCategory;