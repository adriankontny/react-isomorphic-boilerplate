import {
  SELECT_DROPDOWN
} from '../actions/filter-actions'
import { produce, original } from 'immer';
import { get } from 'lodash';

const getItem = (draftState, path) => {
  return !path.length
    ? draftState
    : get(draftState, `items[${path.join('].items[')}]`);
};

const immer = (state, paths = [[]], cb) => {
  return produce(state, draftState => {
    paths.forEach((path) => {
      cb(draftState, getItem(draftState, path));
    });
  });
}

const filters = {
  label: "Category",
  labelDropdown: "Category",
  type: "dropdown",
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
      type: "dropdown",
      items: [
        {
          label: "All",
        },
        {
          label: "Cars",
          type: "value",
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
          type: "value",
        },
      ]
    },
    {
      label: "Real Estate",
      labelDropdown: "Subcategory",
      type: "dropdown",
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
  if (isDropdownItem) {
    item.value = index; //`${index}`;
  }
  const isDropdown = item.type === 'dropdown';
  if (isDropdown) {
    item.select = '';
  }
  (item.items || []).forEach((item, index) => {
    _indexDropdownItems(item, index, isDropdown)
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

    item.filters = [...item.filters, ...parentItem.filters];
    _rootFilters(item)
  });
};

const paths = {};
_indexFiltersPaths(filters, paths);
_indexDropdownItems(filters);
_applyFiltersDefaults(filters);
_rootFilters(filters);


// console.log(paths)

export default function filterReducer(
  state = {
    ...filters
  },
  { type, payload }) { // action: { type, payload }
  let newState;
  switch (type) {
    case SELECT_DROPDOWN:
    //console.log(state)
      newState = immer(state, paths[payload.item.field], (draftState, draftItem) => {
        draftItem.select = payload.value || '';
      });
      // return newState;
      // console.log(payload.item)
      // console.log(payload.value)
      return newState;
    default:
      return { ...state };
  }
};
