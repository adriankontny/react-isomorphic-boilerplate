import { ofType } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';

const query = action$ => action$.pipe(
  ofType('PING'),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo({ type: 'PONG' }),
);

export default query;
