import { ofType } from 'redux-observable';
import {
  delay, mapTo, map, mergeMap,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const query = action$ => action$.pipe(
  ofType('PING'),
  mergeMap(() => ajax.getJSON('https://api.github.com/users/pumbastic').pipe(
    map(console.log),
  )),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo({ type: 'PONG' }),
);

export default query;
