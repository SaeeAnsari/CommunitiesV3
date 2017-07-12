import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { UserService } from '../../providers/user-service';
import {TabsPage} from '../../pages/tabs/tabs';

/**
 * Generated class for the UserLocation page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-location',
  templateUrl: 'user-location.html',
  providers: [UserService]
})
export class UserLocation {

  private completed: boolean= false;
  private defaultCommunityID: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _geolocation: Geolocation,
    private _userService: UserService
    ) {
  }

  ionViewDidLoad() {

    //will load hre

    console.log('ionViewDidLoad UserLocation');
  }

  locateMe() {
    this._geolocation.getCurrentPosition().then((resp) => {

      this._userService.getLoggedinInUser().subscribe(s => {
        let userID = s.ID;

        this._userService.SaveUserLocation(userID, resp.coords.latitude, resp.coords.longitude).subscribe(sub=>{
         if(sub > 0){
           this.defaultCommunityID = sub;//returns the defaultcommunityid
           this.completed = true;
         }
        })
      });


    }).catch((error) => {
        console.log('Error getting location', error);
      });
  }

  SendUserToApp(){

    this.navCtrl.push(TabsPage, {communityID: this.defaultCommunityID});
    //communityID
  }

}
