import getItem from './getItem';

export default (state, filterOrigin, path = []) =>  getItem(state[filterOrigin].filterComponentCategories, path);
