export const _indexFiltersPaths = (category, paths, parentPath = []) => {
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

export const _indexCategories = (category, index = '') => {
  category.value = index;
  category.select = '';
  (category.categories || []).forEach((category, index) => {
    _indexCategories(category, index)
  });
};

export const _applyFiltersDefaults = (category) => {
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

export const _rootFilters = (parentItem) => {
  (parentItem.categories || []).forEach(category => {

    const itemProps = { ...category };
    delete itemProps.root;

    Object.assign(
      category,
      {
        root: { ...parentItem.root, ...category.root },
      },
      {
        ...{ ...parentItem.root, ...itemProps }
      },
    )

    category.filters = [...parentItem.filters, ...category.filters];
    _rootFilters(category)
  });
};