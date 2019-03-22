import {
  SELECT_CATEGORY, UPDATE_INPUT
} from '../actions/filter-actions'
import { produce, original } from 'immer';
import { get } from 'lodash';

const getItem = (filters, path) => {
  return !path.length
    ? filters
    : get(filters, `categories[${path.join('].categories[')}]`);
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
      type: "range",
      label: "Price",
      field: "price",
    },
  ],
  categories: [
    {
      label: "Automotive",
      labelDropdown: "Subcategory",
      categories: [
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

const _indexFiltersPaths = (category, paths, parentPath = []) => {
  (category.categories || []).forEach((category, index) => {
    category.path = [...parentPath, index]
    category.field = category.field || category.label
    !category.field && console.warn(`Filter with undefined field at filters.categories[${category.path.join('].categories[')}]`)
    if (category.field) {
      paths[category.field] = [...(paths[category.field] || []), category.path] // `categories[${path.join('].categories[')}]`]
    }
    _indexFiltersPaths(category, paths, category.path)
  });
};

const _indexDropdownItems = (category, index, isDropdownItem = false) => {
  category.value = index;
  category.select = '';
  (category.categories || []).forEach((category, index) => {
    _indexDropdownItems(category, index)
  });
};

const _applyFiltersDefaults = (category) => {
  Object.assign(category, {
    type: category.type || "input",
    categories: category.categories || [],
    filters: category.filters || [],
    path: category.path || [],
    root: category.root || [],
  });
  category.categories.forEach((category) => {
    _applyFiltersDefaults(category)
  });
};

const _rootFilters = (parentItem) => {
  (parentItem.categories || []).forEach(category => {

    const itemProps = { ...category };
    delete itemProps.root;

    Object.assign(
      category,
      {
        root: { ...parentItem.root, ...category.root  },
      },
      {
        ...{ ...parentItem.root, ...itemProps }
      },
    )

    category.filters = [...parentItem.filters, ...category.filters];
    _rootFilters(category)
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
      category = immer(state.category, paths[payload.category.field], (draftState, draftItem) => {
        draftItem.select = payload.value;
      });
      return { ...state, category };
    case UPDATE_INPUT:
      return { ...state, filterValues: {
        ...state.filterValues,
        [payload.field]: payload.value
      }};
    default:
      return { ...state };
  }
};
