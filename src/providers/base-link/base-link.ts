import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BaseLinkProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class BaseLinkProvider {

  constructor(public http: Http) {
    
  }

  static GetBaseUrl() {
    //return 'http://localhost/change.api/api';
    
    return 'http://saeedansari-001-site2.itempurl.com/api';
    //return 'http://localhost:49520/api';
  }

  static GetMediaURL(){
    //return "http://localhost/Change.API/";
    
    return 'http://saeedansari-001-site2.itempurl.com/';  
  }
}
