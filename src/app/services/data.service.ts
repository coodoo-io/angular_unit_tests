import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/observable';
import {of } from 'rxjs/observable/of';

@Injectable()
export class DataService {
  data: Array<Object> = [
    {
      'id': 1,
      'name': 'Writing Tests',
      'checked': true,
      'description': 'FOO LALALA'
    },
    {
      'id': 2,
      'name': 'Review Code',
      'checked': false,
      'description': 'FOO LALALA'
    },
    {
      'id': 3,
      'name': 'Review Code 2',
      'checked': false,
      'description': 'FOO LALALA'
    },
    {'id': 4, 'name': 'Review Code 3', 'checked': true, 'description': ''}
  ];


  getData(): Observable<Array<Object>> {
    return of ([...this.data]);
  }
}
