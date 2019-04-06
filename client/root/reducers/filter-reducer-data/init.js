import path from 'path';
import fs from 'fs';
import JSONbeautify from 'json-beautify';
import category from './data'

import {
  _indexFiltersPaths,
  _indexCategories,
  _applyFiltersDefaults,
  _rootFilters
} from './filter-initializers';

const paths = {};
_indexFiltersPaths(category, paths);
_indexCategories(category);
_applyFiltersDefaults(category);
_rootFilters(category);

fs.writeFileSync(path.resolve(__dirname, './category.json'), JSONbeautify(category, null, 2, 100), function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('The file "./category.json"  was updated!');
});

fs.writeFileSync(path.resolve(__dirname, './paths.json'), JSONbeautify(paths, null, 2, 100), function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('The file "./paths.json"  was updated!');
});