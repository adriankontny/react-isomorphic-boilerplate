
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducers';
import rootEpic from './epics';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const epicMiddleware = createEpicMiddleware();

const createPreloadedStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(epicMiddleware),
    ),
  );
  epicMiddleware.run(rootEpic);
  return store;
};

export default createPreloadedStore;
