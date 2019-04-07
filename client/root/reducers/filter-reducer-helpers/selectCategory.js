import { produce } from 'immer';
import getItem from './getItem';
import { paths } from './../filter-reducer-data';

const selectCategory = (state, field, value) => {
  const category = produce(state.category, draftState => {
    const draftItem = getItem(draftState, paths[field]);
    draftItem.select = value;
  });
  return { ...state, category };
}

export default selectCategory;