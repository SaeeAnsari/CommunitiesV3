import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Firebase } from '@ionic-native/firebase';


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


import firebase, { messaging } from 'firebase';


/*
  Generated class for the FirebaseMessagingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseMessagingProvider {

  private _url: string = 'https://fcm.googleapis.com/v1/projects/communities-386e8/messages:send';
  private messagingToken: string;
  
    constructor(public http: Http,public firebaseIonic:Firebase) {
      
    }

    public initializeMessaging(){
      var config = {
        apiKey: "AIzaSyCezp8wNVyV1qdygpnGuYLpys85-WcHVKo",
        authDomain: "communities-386e8.firebaseapp.com",
        databaseURL: "https://communities-386e8.firebaseio.com",
        projectId: "communities-386e8",
        storageBucket: "communities-386e8.appspot.com",
        messagingSenderId: "634674165562"
      };
      firebase.initializeApp(config);   
    }

    public requestPermission(){
      var messaging = firebase.messaging();
      messaging.requestPermission().then(ret=>{
        console.log("Messaging Permission: Permission Granted");
      }).catch(err=>{
        console.log("Messaging Error happened while requesting")
      });      
    }


    public SubscibeToTopic(topic:string){
      let mess = firebase.messaging;

      
      this.firebaseIonic.subscribe(topic).then(ret=>{
        console.log(ret);
      })
      .catch(this.handleError);
    }
  
  
    public SendNotificationToTopic(storyID: number, message: string): Observable<any> {
      this.messagingToken = sessionStorage.getItem("messagingToken");
      

      console.log("Firebase Token: " + this.messagingToken);
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + this.messagingToken);
  
      let data = {
        
        "message":{
          "topic" : storyID.toString(),
          "notification" : {
            "body" : message,
            "title" : "Communities",
            }
         }
        
        /*"condition": storyID.toString(),
        "data": {
          "message": message,
        }*/
      };

      console.log("FCM Data: " + JSON.stringify(data));
  
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
