import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { UserService } from '../../providers/user-service';
import { TabsPage } from '../../pages/tabs/tabs';

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

  private completed: boolean = false;
  private defaultCommunityID: number = 0;
  @Input() LaunchType: string = "Registration";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _geolocation: Geolocation,
    private _userService: UserService,
    private vc: ViewController
  ) {

    if (this.navParams.get("launchType")) {
      this.LaunchType = this.navParams.get("launchType");
    }
  }

  ionViewDidLoad() {


    console.log('ionViewDidLoad UserLocation');
  }

  locateMe() {
    this._geolocation.getCurrentPosition().then((resp) => {


      let userID = this._userService.GetLoggedInUserID();

      this._userService.SaveUserLocation(userID, resp.coords.latitude, resp.coords.longitude).subscribe(sub => {
        if (sub > 0) {
          this.defaultCommunityID = sub;//returns the defaultcommunityid
          this.completed = true;
        }
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  SendUserToApp() {
    if (this.LaunchType == "Registration") {
      this.navCtrl.push(TabsPage, { communityID: this.defaultCommunityID });
      //communityID
    }
    else if (this.LaunchType == "Settings") {
      this.vc.dismiss();
    }
  }

}
