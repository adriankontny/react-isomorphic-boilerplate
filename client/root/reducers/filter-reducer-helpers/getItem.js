import { get } from 'lodash';

const getItem = (filterObject, path = []) => {
  return !path.length
    ? filterObject
    : get(filterObject, `categories[${path.join('].categories[')}]`) || filterObject;
};

export default getItem;