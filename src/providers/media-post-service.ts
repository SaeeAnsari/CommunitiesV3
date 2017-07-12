import { Injectable } from '@angular/core';


import {BaseLinkProvider} from '../providers/base-link/base-link';

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
  Generated class for the MediaPostService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MediaPostService {

  constructor(private _http: Http) { }

  private _url = BaseLinkProvider.GetBaseUrl() + '/ImageUpload';

  postImage(formData, type:string): Observable<any> {
    let headers = new Headers()
  
    let options = new RequestOptions({ headers: headers });

    console.log(this._url + '/UploadImage?type=' + type);
    
    return this._http.post(this._url + '/UploadImage?type=' + type, formData, options)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
  }

  postVideo(formData){
    let headers = new Headers()
    
    let options = new RequestOptions({ headers: headers });
    
    return this._http.post(this._url + '/VideoUpload/UploadVideo', formData, options)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
  }

}
