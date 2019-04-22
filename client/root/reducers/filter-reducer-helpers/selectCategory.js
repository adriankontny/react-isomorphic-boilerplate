import { produce } from 'immer';
import getItem from './getItem';
import { get, set } from 'lodash';
import { paths } from './../filter-reducer-data';

const selectCategory = (state, field, value, filtersObjectPath) => {
  const filterObject = produce(state.filterObject, draftState => {
    const draftItem = getItem(draftState, paths[field]);
    draftItem.select = value;
  });
  return { ...state, filterObject };

  // const filters = produce(state.filters, draftState => {
  //   const draftFilter = get(draftState, filtersObjectPath, {});
  //   set(draftState, filtersObjectPath, draftFilter);
  // 
  //   console.log(paths[field])
  //   const path = paths[field] == undefined
  //     ? [value]
  //     : [...paths[field], value]
  // 
  //   const draftItem = getItem(state.filterObject, path);
  //   draftFilter.c = draftItem.field;
  // //   draftItem.select = value;
  // });
}

export default selectCategory;