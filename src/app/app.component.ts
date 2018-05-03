import { Component, ViewChild } from '@angular/core';
import {Platform, IonicPage, NavController, Nav, NavParams, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks'

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

  @ViewChild(Nav) navChild:Nav;

  rootPage: any = Login;
  //rootPage: any = TabsPage;//LiveFeed;//MyCommunitiesPage;//UserSearchComponent;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, deeplinks: Deeplinks) {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      
      setTimeout(function () {
        splashScreen.hide();
      }, 2000);



      deeplinks.routeWithNavController(this.navChild, {
        '/login': Login
      }).subscribe((match) => {
          // match.$route - the route we matched, which is the matched entry from the arguments to route()
          // match.$args - the args passed in the link
          // match.$link - the full link data
          console.log('Successfully matched route', match);
        }, (nomatch) => {
          // nomatch.$link - the full link data
          console.error('Got a deeplink that didn\'t match', nomatch);
        });
    });


  }
}
