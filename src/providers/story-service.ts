import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';


import {BaseLinkProvider} from '../providers/base-link/base-link';



import { UserPost } from '../interfaces/user-post';
import { Story } from '../interfaces/story';


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
  Generated class for the StoryService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StoryService {

  private _url = BaseLinkProvider.GetBaseUrl()+ '/Story';
  private _uploadURL = BaseLinkProvider.GetMediaURL();
  headers: Headers;

  constructor(private _http: Http) {


  }

  public GetStory(id: number) {
    return this._http.get(this._url + '/' + id)
      .map(ret => ret.json());
  }

  public SetLike(storyID: number, userID: number, commentID?: number): Observable<any> {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let data = new URLSearchParams();

    let appendURL: string = '';

    appendURL = '/SetLike?storyID=' + storyID + '&commentID=' + commentID + '&userID=' + userID;

    return this._http.post(
      this._url + appendURL,
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

  GetStoriesByCommunity(communityID: number, pageIndex: number): Observable<any> {

    return this._http.get(this._url + '?communityID=' + communityID + '&pageIndex=' + pageIndex)
      .map(post => post.json())
      .catch(this.handleError);
  }

  SavePost(
    userID: number,
    postText: string,
    mediaType: string,
    mediaName: string,
    selectedCommunities: number[],
    externalImageURL: string,
    storyExternalURL: string
    ): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let id: number;
    let videoTag;
    let imageURL = '';



    if (mediaType == "Video" && mediaName.length > 0) {
      videoTag = {
        ID: -1,
        VideoIdentifier: this._uploadURL + '/MediaUpload/Story/' + mediaName,
        HostProvider: 1
      }
    }
    else {
      videoTag = {
        ID: -1,
        VideoIdentifier: '',
        HostProvider: 0
      };
      if (externalImageURL.length > 0) {
        imageURL = externalImageURL;
      }
      else if (mediaName.length > 0) {
        imageURL = this._uploadURL + '/MediaUpload/Story/Thumb/' + mediaName;
      }
    }



    let data = {
      ID: -1,
      UserID: userID,
      LongDescription: postText,
      Video: videoTag,
      CommunityIDs: [],
      ImageURL: imageURL,
      StoryExternalURL: storyExternalURL
    };
    if (selectedCommunities.length > 0) {
      data.CommunityIDs = selectedCommunities;
    }

    return this._http.post(
      this._url + '/InsertStory',
      data
      ,
      { headers: this.headers }
    ).map(res => res.json())
      .catch(this.handleError)
  }

}
