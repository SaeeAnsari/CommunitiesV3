import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { Login } from '../pages/login/login';

import { UserLocation } from '../pages/user-location/user-location';
import { MyCommunitiesPage } from '../pages/my-communities/my-communities';
import { UserSearchComponent } from '../pages/user-search-component/user-search-component';
import { LiveFeed } from '../pages/live-feed/live-feed';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = Login;
  //rootPage: any = TabsPage;//LiveFeed;//MyCommunitiesPage;//UserSearchComponent;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      
      setTimeout(function () {
        splashScreen.hide();
      }, 4000);
    });


  }
}
