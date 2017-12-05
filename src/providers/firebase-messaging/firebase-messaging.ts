import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
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
  Generated class for the FirebaseMessagingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseMessagingProvider {

  private _url: string = 'https://fcm.googleapis.com/fcm/send';
  
    constructor(public http: Http) {
      
    }
  
  
    public SendNotificationToTopic(storyID: number, message: string): Observable<any> {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'key=AAAAk8WHNzo:APA91bHvEpltk-q5R_veZBiOsjMvoe5NPIXajUHb-h85taUhWoh-RFF2WBTygtILOVzKAg0zFXH-mgrq7CwWUbW-HiaxevXAmADeEhbQCrj7Lcak3HIK9oJIZ8XhqHmCohdJpaz_e9FO');
  
      let data = {
        "condition": "'" + storyID.toString() + "' in topics",
        "data": {
          "message": message,
        }
      };
  
      return this.http.post(
        this._url,
        data,
        { headers: headers }
      ).map(res => res.json())
        .catch(this.handleError)
  
    }
  
    private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      console.log(error._body);
      return Observable.throw(errMsg);
    }

}
