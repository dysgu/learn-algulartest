import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BuscarService {

  private commentsUrl = 'https://reqres.in/api/users?page=2';

  constructor(private http: Http) {
    console.log('== construtor == BuscarService carregou...');
  }

  buscar(): Observable<String[]> {
    return this.http.get(this.commentsUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
