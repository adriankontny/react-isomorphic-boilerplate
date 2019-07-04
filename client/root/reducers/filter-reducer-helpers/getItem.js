import get from 'lodash/get';

const getItem = (filterComponent, path = []) => {
  return !path.length
    ? filterComponent
    : get(filterComponent, `categories[${path.join('].categories[')}]`) || filterComponent;
};

export default getItem;