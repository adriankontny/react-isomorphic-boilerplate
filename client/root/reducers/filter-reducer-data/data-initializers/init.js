import path from 'path';
import fs from 'fs';
import JSONbeautify from 'json-beautify';
import produce from 'immer';
import filterBlueprint from './data';

import {
  _indexFiltersPaths,
  _indexCategories,
  _applyFiltersDefaults,
  _rootFilters,
} from './initializers';

const filterBlueprintPaths = {};
_indexFiltersPaths(filterBlueprint, filterBlueprintPaths);
_indexCategories(filterBlueprint);
_applyFiltersDefaults(filterBlueprint);
_rootFilters(filterBlueprint);

const filterBlueprintCategories = produce(filterBlueprint, (draftFilterBlueprint) => {
  const extractCategories = (filter) => {
    for (const variable in filter) {
      if (['select', 'field', 'value', 'categories'].some((item) => item === variable)) continue;
      delete filter[variable];
    }
    filter.categories.forEach((caegory) => extractCategories(caegory));
  };
  extractCategories(draftFilterBlueprint);
});

fs.writeFileSync(path.resolve(__dirname, '../filterBlueprint.json'), JSONbeautify(filterBlueprint, null, 2, 100), (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('The file "../filterBlueprint.json"  was updated!');
});

fs.writeFileSync(path.resolve(__dirname, '../filterBlueprintPaths.json'), JSONbeautify(filterBlueprintPaths, null, 2, 100), (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('The file "../filterBlueprintPaths.json"  was updated!');
});

fs.writeFileSync(path.resolve(__dirname, '../filterBlueprintCategories.json'), JSONbeautify(filterBlueprintCategories, null, 2, 100), (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('The file "../filterBlueprintCategories.json"  was updated!');
});
