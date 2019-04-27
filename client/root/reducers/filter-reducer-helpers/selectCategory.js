import { produce } from 'immer';
import getItem from './getItem';
import { get, set } from 'lodash';
import { filterBlueprintPaths } from './../filter-reducer-data';

const selectCategory = (state, field, value, filtersObjectPath) => {
  const filterObject = produce(state[filtersObjectPath].filterObject, draftState => {
    const draftItem = getItem(draftState, filterBlueprintPaths[field]);
    draftItem.select = value;
  });
  
  return { ...state, [filtersObjectPath]: { ...state[filtersObjectPath], filterObject} };
}

export default selectCategory;