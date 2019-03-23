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

const immer = (state, paths = [[]], cb) => {
  return produce(state, draftState => {
    paths.forEach((path) => {
      cb(draftState, getItem(draftState, path));
    });
  });
}

const category = {
  label: "Category",
  labelCategories: "Category",
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
      labelCategories: "Subcategory",
      categories: [
        {
          label: "Cars",
          labelCategories: "Subcategory",
          categories: [
            {
              label: "Sedan",
            },
            {
              label: "SUV",
            }
          ],
          filters: [
            {
              label: "Extras",
              field: "extras",
              type: "multiselect",
              items: [{
                value: 0,
                label: "ABS",
                field: "abs",
              },{
                value: 1,
                label: "ESP",
                field: "esp",
              },{
                value: 2,
                label: "Steering Assistance",
                field: "sa",
              },{
                value: 3,
                label: "Bluetooth",
                field: "bt",
              }]
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
      labelCategories: "Subcategory",
    },
  ],
}

const _indexFiltersPaths = (category, paths, parentPath = []) => {
  (category.categories || []).forEach((category, index) => {
    category.path = [...parentPath, index]
    category.field = category.field || category.label
    !category.field && console.warn(`Filter with undefined field at filters.categories[${category.path.join('].categories[')}]`)
    if (category.field) {
      paths[category.field] = category.path // `categories[${path.join('].categories[')}]`]
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
  let field;
  switch (type) {
    case SELECT_CATEGORY:
      category = produce(state.category, draftState => {
        const draftItem = getItem(draftState, paths[payload.field]);
        draftItem.select = payload.value;
      });
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
