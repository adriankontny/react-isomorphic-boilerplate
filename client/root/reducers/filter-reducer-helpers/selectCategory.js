import { produce } from 'immer';
import getItem from './getItem';
import get from 'lodash/get';
import set from 'lodash/set';
import { filterBlueprintPaths } from './../filter-reducer-data';

const selectCategory = (state, field, value, filterOrigin) => {
  const filterObject = produce(state[filterOrigin].filterObject, draftState => {
    const draftItem = getItem(draftState, filterBlueprintPaths[field]);
    draftItem.select = value;
  });
  
  return { ...state, [filterOrigin]: { ...state[filterOrigin], filterObject} };
}

export default selectCategory;