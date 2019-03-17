import {
  SELECT_CATEGORY, UPDATE_INPUT
} from '../actions/filter-actions'
import { produce, original } from 'immer';
import { get } from 'lodash';

const getItem = (filters, path) => {
  return !path.length
    ? filters
    : get(filters, `items[${path.join('].items[')}]`);
};

const immer = (state, paths = [[]], cb) => {
  return produce(state, draftState => {
    paths.forEach((path) => {
      cb(draftState, getItem(draftState, path));
    });
  });
}

const category = {
  label: "Category",
  labelDropdown: "Category",
  filters: [
    {
      label: "Price",
      field: "price",
      type: "filter"
    },
  ],
  items: [
    {
      label: "All",
    },
    {
      label: "Automotive",
      labelDropdown: "Subcategory",
      items: [
        {
          label: "All",
        },
        {
          label: "Cars",
          filters: [
            {
              label: "Milage",
              field: "milage",
              type: "filter"
            }
          ]
        },
        {
          label: "Bikes",
        },
      ]
    },
    {
      label: "Real Estate",
      labelDropdown: "Subcategory",
    },
  ],
}

const _indexFiltersPaths = (item, paths, parentPath = []) => {
  (item.items || []).forEach((item, index) => {
    item.path = [...parentPath, index]
    item.field = item.field || item.label
    !item.field && console.warn(`Filter with undefined field at filters.items[${item.path.join('].items[')}]`)
    if (item.field) {
      paths[item.field] = [...(paths[item.field] || []), item.path] // `items[${path.join('].items[')}]`]
    }
    _indexFiltersPaths(item, paths, item.path)
  });
};

const _indexDropdownItems = (item, index, isDropdownItem = false) => {
  item.value = index;
  item.select = '';
  (item.items || []).forEach((item, index) => {
    _indexDropdownItems(item, index)
  });
};

const _applyFiltersDefaults = (item) => {
  Object.assign(item, {
    type: item.type || "input",
    items: item.items || [],
    filters: item.filters || [],
    path: item.path || [],
    root: item.root || [],
  });
  item.items.forEach((item) => {
    _applyFiltersDefaults(item)
  });
};

const _rootFilters = (parentItem) => {
  (parentItem.items || []).forEach(item => {

    const itemProps = { ...item };
    delete itemProps.root;

    Object.assign(
      item,
      {
        root: { ...parentItem.root, ...item.root  },
      },
      {
        ...{ ...parentItem.root, ...itemProps }
      },
    )

    item.filters = [...parentItem.filters, ...item.filters];
    _rootFilters(item)
  });
};

const paths = {};
_indexFiltersPaths(category, paths);
_indexDropdownItems(category);
_applyFiltersDefaults(category);
_rootFilters(category);

export default function filterReducer(
  state = {
    category,
    filterValues: {},
  },
  { type, payload }) { // action: { type, payload }
  let category;
  switch (type) {
    case SELECT_CATEGORY:
      category = immer(state.category, paths[payload.item.field], (draftState, draftItem) => {
        draftItem.select = payload.value || '';
      });
      return { ...state, category };
    case UPDATE_INPUT:
      return { ...state, filterValues: {
        ...state.filterValues,
        [payload.item.field]: payload.value
      }};
    default:
      return { ...state };
  }
};
