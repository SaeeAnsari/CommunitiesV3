import { Injectable } from '@angular/core';
import { Community } from '../interfaces/community';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import {BaseLinkProvider} from '../providers/base-link/base-link';


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
  Generated class for the CommunityService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommunityService {

 

  private _baseURL = BaseLinkProvider.GetBaseUrl();
  private _url = this._baseURL + '/Community';
  private _imageUploadURL = BaseLinkProvider.GetMediaURL();

  private _communities: Community[] = [];
  headers: Headers;
  options: RequestOptions;

  constructor(private _http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }


  public GetAllCommunities(searchTerm: string, userID: number): Observable<any> {

    return this._http.get(this._url + '?userID=' + userID + '&searchTerm=' + searchTerm)
      .map(ret => ret.json());

  }


  public GetUserCommunities(userID: number): Observable<any> {
    return this._http.get(this._baseURL + '/User/GetUserCommunities?userID=' + userID)
      .map(ret => ret.json());
  }

  public GetCommunity(id: number) {
    return this._http.get(this._url + '/' + id)
      .map(ret => ret.json());
  }


  public SaveCommunity(community: Community, userID:number): Observable<any> {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let id: number;

    let data = {
        Name: community.name,
        Description: community.description,
        ImageURL: this._imageUploadURL + '/MediaUpload/Community/Thumb/' + community.imageURL,
        OwnerID: userID,
        Type: 2,
        ID: community.id,
        Location: null
      };

      if(community.location != null){
        data.Location= {
          Lattitude: community.location.lat,
          Logitude: community.location.lng
        };
      }

    return this._http.post(
      this._url,
      JSON.stringify(data),
      { headers: this.headers }
    ).map(res => res.json())
      .catch(this.handleError)

  }


  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
