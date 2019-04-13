import path from 'path';
import fs from 'fs';
import JSONbeautify from 'json-beautify';
import filterObject from './data'

import {
  _indexFiltersPaths,
  _indexCategories,
  _applyFiltersDefaults,
  _rootFilters
} from './initializers';

const paths = {};
_indexFiltersPaths(filterObject, paths);
_indexCategories(filterObject);
_applyFiltersDefaults(filterObject);
_rootFilters(filterObject);

fs.writeFileSync(path.resolve(__dirname, '../filterObject.json'), JSONbeautify(filterObject, null, 2, 100), function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('The file "../filterObject.json"  was updated!');
});

fs.writeFileSync(path.resolve(__dirname, '../paths.json'), JSONbeautify(paths, null, 2, 100), function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('The file "../paths.json"  was updated!');
});