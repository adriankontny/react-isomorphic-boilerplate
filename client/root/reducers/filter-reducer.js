import {
  SELECT_CATEGORY, UPDATE_INPUT, SELECT_MULTISELECT
} from '../actions/filter-actions'
import { produce, original } from 'immer';
import { get } from 'lodash';

const getItem = (filters, path = []) => {
  return !path.length
    ? filters
    : get(filters, `categories[${path.join('].categories[')}]`) || filters;
};

import category from './filter-reducer-data/category.json'
import paths from './filter-reducer-data/paths.json'

export default function filterReducer(
  state = {
    category,
    filterValues: {},
  },
  { type, payload }) { // action: { type, payload }
  let category;
  let field;
  switch (type) {
    case SELECT_CATEGORY:
      category = produce(state.category, draftState => {
        const draftItem = getItem(draftState, paths[payload.field]);
        draftItem.select = payload.value;
      });

      const url = produce(state.url, draftState => {
        const draftItem = getItem(state, paths[payload.field])
        console.log(payload.location)
      })
      return { ...state, category };
    case UPDATE_INPUT:
      return { ...state, filterValues: {
        ...state.filterValues,
        [payload.field]: payload.value
      }};
    case SELECT_MULTISELECT:
      field = payload.filter.items[payload.value].field;
      return { ...state, filterValues: {
        ...state.filterValues,
        [field]: state.filterValues[field] ? undefined : true
      }};
    default:
      return { ...state };
  }
};
