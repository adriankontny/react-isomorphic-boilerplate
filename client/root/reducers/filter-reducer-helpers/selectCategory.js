import { produce } from 'immer';
import getItem from './getItem';
import { paths } from './../filter-reducer-data';

const selectCategory = (state, field, value) => {
  const filterObject = produce(state.filterObject, draftState => {
    const draftItem = getItem(draftState, paths[field]);
    draftItem.select = value;
  });
  return { ...state, filterObject };
}

export default selectCategory;