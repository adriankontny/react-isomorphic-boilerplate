import { get } from 'lodash';

const getItem = (filters, path = []) => {
  return !path.length
    ? filters
    : get(filters, `categories[${path.join('].categories[')}]`) || filters;
};

export default getItem;