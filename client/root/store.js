
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware, ofType } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { some } from 'lodash';
import rootReducer, { createPreloadedState } from './reducers';
import rootEpic from './epics';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export { createPreloadedState };

export default function createPreloadedStore(preloadedState) {
  
  const epicMiddleware = createEpicMiddleware();

  const middlewares = [epicMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeEnhancers(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  
  const epic$ = new BehaviorSubject(rootEpic);
  const hotReloadingEpic = (action$, ...rest) =>
  epic$.pipe(
    mergeMap(epic =>
      epic(action$, ...rest).pipe(
        takeUntil(action$.pipe(
          ofType('EPIC_END')
        ))
      )
    )
  );
  epicMiddleware.run(hotReloadingEpic);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept(['./reducers', './epics'], modules => {
      store.dispatch({ type: 'EPIC_END' });
      epic$.next(rootEpic);
      if (some(modules, m => m.indexOf('/epics') === -1)) {
        store.replaceReducer(rootReducer);
      }
    });
  }
  return store;
};