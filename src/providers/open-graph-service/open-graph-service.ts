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
  Generated class for the OpenGraphServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class OpenGraphServiceProvider {

  headers: Headers;

  options: RequestOptions;

  private api_key="590751b74749847224a44c62";


  constructor(public _http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

//https://opengraph.io/api/1.0/site/http%3A%2F%2Fwww.summerfunguide.ca%2Fcompanyprofile%2Fcarassauga-mississauga-s-festival-of-cultures-may-22-24-2015.html?app_id=590751b74749847224a44c62
  private _url = 'https://opengraph.io/api/1.0/site/';


  public GetOpenGraphDetails(uri: string): Observable<any> {

    let url= this._url + uri + "?app_id=" + this.api_key

    return this._http.get(url)
      .map(ret => ret.json());
  }

  public checkIfURLExist(text: string){
    let uri = '';
    let word = '';
    text.split(' ').forEach(function(obj){
      if(obj.trim().toLowerCase().indexOf("http://")> -1){
        uri = obj.trim();
      }
      else if(obj.trim().toLowerCase().indexOf("https://")> -1){
       uri = obj.trim();
      }
      else if(obj.trim().toLowerCase().indexOf("www.")> -1){
        uri = obj.trim();
      }
    });    
    return uri.length> 15? uri: "";//the length has to be > 15 else the user is still typing
  }
}
