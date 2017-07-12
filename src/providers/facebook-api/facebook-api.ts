import { Injectable } from '@angular/core';
import { Community } from '../interfaces/community';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


/*
/*
  Generated class for the FacebookApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FacebookApiProvider {


  headers: Headers;

  options: RequestOptions;

  private api_key="1863707417227215|VIfThcOsINo0Gycr5aZMSCqs7U4";

  constructor(public _http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  private _url = 'https://graph.facebook.com/';

  public GetOpenGraphDetails(uri: string): Observable<any> {

    let url= this._url + uri + "?app_id=" + this.api_key

    return this._http.get(url)
      .map(ret => ret.json());
  }


}
