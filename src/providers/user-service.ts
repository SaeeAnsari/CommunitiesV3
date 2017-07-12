import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
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
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {

  public getLoggedinInUser() {

    
    let _id = +sessionStorage.getItem('userID');
    return this.GetUser(_id);

  }
  public GetUser(id: number) {
    return this._http.get(this._url + '/' + id)
      .map(ret => ret.json());
  }

  private isUploadingImage = false;
  private _url = BaseLinkProvider.GetBaseUrl() + '/User';
  private _imageUploadURL = BaseLinkProvider.GetMediaURL();;
  private _users: User[] = [];
  headers: Headers;

  options: RequestOptions;

  constructor(private _http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  /*
  
    public GetAllActiveUsers_old() {
  
      let params: URLSearchParams = new URLSearchParams();
  
      var request = new RequestOptions();
      request.search = params;
  
      var ret = this._http.get(this._url, request)
        .map(ret => ret.json())
        .subscribe(sub => {
          sub.forEach(element => {
  
            var user = {
              id: element.ID,
              firstName: element.FirstName,
              lastName: element.LastName,
              active: element.Active,
              authenticationPortalID: element.AuthenticationPortalID
            };
  
            this._users.push(user);
          });
        })
      return this._users;
    }
  */

  public GetAllActiveUsers(searchVal: string, communityID: number): Observable<any> {
    return this._http.get(this._url + '/GetSearch?communityID=' + communityID + '&searchTerm=' + searchVal)
      .map(ret => ret.json());
  }

  public AddUsertoCommunity(userID: number, communityID: number): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');



    let data = new URLSearchParams();
    //data.append('userID', 1);
    //data.append('CommunityID', '1');

    return this._http.post(
      this._url + '/AddUsertoCommunity?userID=' + userID + '&communityID=' + communityID,
      data,
      { headers: this.headers }
    ).map(res => res.json())
      .catch(this.handleError)

  }


  public RemoveUserFromCommunity(userID: number, communityID: number) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');



    let data = new URLSearchParams();

    return this._http.post(
      this._url + '/RemoveUserFromCommunity?userID=' + userID + '&communityID=' + communityID,
      data,
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

  public RegisterUser(user: User) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {
      ID: user.id,
      FirstName: user.firstName,
      LastName: user.lastName,
      Email: user.email,
      ImageURL: this._imageUploadURL + '/MediaUpload/User/Thumb' + user.imageURL,
      AuthPortal: user.authenticationPortalID,
      Password: user.password
    }

    return this._http.post(
      this._url,
      data,
      { headers: this.headers }
    )
      .map(res => res.json())
      .catch(this.handleError)

  }


  public SaveUserLocation(userId: number, lattitude, longitude) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {
      userID: userId,
      latitude: lattitude,
      longitude: longitude
    };

    return this._http.post(
      this._url + '/SaveUserLocation?userID=' + userId + '&latitude=' + lattitude + '&longitude=' + longitude,
      null,
      { headers: this.headers }
    )
      .map(res => res.json())
      .catch(this.handleError)
  }

  public LoginUser(email: string, password: string): Observable<any> {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post(
      this._url + '/LoginUser?username=' + email + '&password=' + password,
      null,
      { headers: this.headers }
    )
      .map(res => res.json())
      .catch(this.handleError)

  }
}
