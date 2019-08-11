import get from 'lodash/get';

const getItem = (filterComponent, path = []) => (!path.length
  ? filterComponent
  : get(filterComponent, `categories[${path.join('].categories[')}]`) || filterComponent);

export { getItem };

export default (state, filterOrigin, path = []) => getItem(state[filterOrigin].filterComponentCategories, path);
