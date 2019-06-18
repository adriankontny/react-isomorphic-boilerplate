import get from 'lodash/get';

const getItem = (filterObject, path = []) => {
  return !path.length
    ? filterObject
    : get(filterObject, `categories[${path.join('].categories[')}]`) || filterObject;
};

export default getItem;