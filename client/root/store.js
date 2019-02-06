
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import rootReducer from './reducers';
import rootEpic from './epics';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const epicMiddleware = createEpicMiddleware();

export default function createPreloadedStore(preloadedState) {
  
  const middlewares = [epicMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeEnhancers(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  
  const epic$ = new BehaviorSubject(rootEpic);
  const hotReloadedEpic = (...args) => {
    return epic$.pipe(
      switchMap(epic => epic(...args))
    );
  };
  epicMiddleware.run(hotReloadedEpic);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept(['./reducers', './epics'], () => {
      store.replaceReducer(rootReducer);
      epic$.next(rootEpic);
    });
  }
  return store;
};