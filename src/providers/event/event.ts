import { Injectable } from '@angular/core';

import { BaseLinkProvider } from '../../providers/base-link/base-link';

import { Event } from '../../interfaces/event/event';

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
  Generated class for the EventProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EventProvider {

  headers: Headers;

  options: RequestOptions;

  constructor(private _http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  private _url = BaseLinkProvider.GetBaseUrl() + '/Event';


  public PostEvent(id: number, name: string, description: string, imageURL: string, active: boolean, ownerID: number, address: string,
    city: string, postalZip: string, country: string, link: string): Observable<any> {

    let data = new URLSearchParams();

    return this._http.post(this._url,
      JSON.stringify({
        ID: id,
        Name: name,
        Description:description,
        ImageURL: imageURL,
        Active:active,
        OwnerID:ownerID,
        Address:address,
        City:city,
        PostalZip:postalZip,
        Country:country,
        Link: link
      }),
      { headers: this.headers })
      .map(res => res.json())
      ._catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    console.log(error._body);
    return Observable.throw(errMsg);
  }

}
