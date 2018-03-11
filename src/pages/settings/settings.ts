import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Login } from '../login/login';
import { Storage } from '@ionic/storage';

import { UserLocation } from '../user-location/user-location';

import {FirebaseMessagingProvider} from '../../providers/firebase-messaging/firebase-messaging'

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [FirebaseMessagingProvider]
})
export class SettingsPage {

  constructor(
    //public navCtrl: NavController,
    //public navParams: NavParams,
    private app: App,
    private storage: Storage,
    public modalCtrl: ModalController,
    public fcm: FirebaseMessagingProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  SignOut() {
    this.storage.clear();
    sessionStorage.setItem('userID', null);    
    this.storage.set("userID", null);
    this.app.getRootNav().setRoot(Login);
    //this.app.getActiveNav().setRoot(Login);
    

    //this.navCtrl.push(Login);
  }

  launchUpdateLocation() {
    let userLocationModal = this.modalCtrl.create(UserLocation, {launchType:"Settings"} , { showBackdrop: true, enableBackdropDismiss: true });
    userLocationModal.present();
  }

  SubscribeTest(){
    this.fcm.SubscibeToTopic("1338");
  }

}
