import path from 'path';
import fs from 'fs';
import JSONbeautify from 'json-beautify';
import filterBlueprint from './data'

import {
  _indexFiltersPaths,
  _indexCategories,
  _applyFiltersDefaults,
  _rootFilters
} from './initializers';

const filterBlueprintPaths = {};
_indexFiltersPaths(filterBlueprint, filterBlueprintPaths);
_indexCategories(filterBlueprint);
_applyFiltersDefaults(filterBlueprint);
_rootFilters(filterBlueprint);

fs.writeFileSync(path.resolve(__dirname, '../filterBlueprint.json'), JSONbeautify(filterBlueprint, null, 2, 100), function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('The file "../filterBlueprint.json"  was updated!');
});

fs.writeFileSync(path.resolve(__dirname, '../filterBlueprintPaths.json'), JSONbeautify(filterBlueprintPaths, null, 2, 100), function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('The file "../filterBlueprintPaths.json"  was updated!');
});