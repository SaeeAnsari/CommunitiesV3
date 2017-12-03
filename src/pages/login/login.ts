import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { Platform } from 'ionic-angular';
import { LoginComponent } from '../../components/login-component/login-component';
import { RegisterUserComponent } from '../../components/register-user-component/register-user-component';
import { UserLocation } from '../user-location/user-location';
import { UserService } from '../../providers/user-service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Firebase } from '@ionic-native/firebase';

import { ErrorLogServiceProvider } from '../../providers/error-log-service/error-log-service';

import { User } from '../../interfaces/User';

import firebase from 'firebase';


import { ForgetPasswordComponent } from '../../components/forget-password/forget-password';



/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService, Facebook, ErrorLogServiceProvider]
})
export class Login {

  private userLoaded: boolean = false; //Hack to make sure we only load the user once
  
  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private _userService: UserService,
    private fb: Facebook,
    private err: ErrorLogServiceProvider,
    private platform: Platform,
    private firebaseIonic: Firebase
  ) {
    //this.onNotification();



    if (firebase.apps.length == 0) {
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


    firebase.auth().onAuthStateChanged(user => {
      if (user) {

        console.log("Google Logged in User");

        let _googleID = user.uid;
        let name = user.displayName;
        let email = user.email;
        let photo = user.photoURL;

        let firstname = name.split(' ')[0].trim();
        let lastName = name.replace(firstname, "").trim();

        this._userService.AuthenticateThirdPartyUser(_googleID).subscribe(sub => {
          console.log("RAW got : " + sub);

          if (sub != null && +sub > 0) {
            console.log("Found the User : " + sub);
            this.storage.set('userID', sub);
            this.ionViewDidLoad();
          }
          else {

            var user = {
              id: -1,
              firstName: firstname,
              lastName: lastName,
              gender: null,
              email: email,
              imageURL: photo,
              thirdPartyAuthID: _googleID,
              authenticationPortalID: 3,
              active: true
            }

            console.log(user);

            this._userService.RegisterSocialAuthUser(user).subscribe(sub => {
              console.log("loaded :" + sub);
              this.storage.set('userID', sub);
              this.ionViewDidLoad();
            });
          }
        });
      }
    });
  }
/*
  async onNotification() {
    try {

     
      await this.platform.ready();   

      this.firebaseIonic.onNotificationOpen().subscribe(sub => {
        console.log("Notification Opened");
        console.log(sub);
      });
    }
    catch (e) {
      console.log('erroring');
      console.log(e)
    }
  }
  */

  facebookLogin() {

    this.err.logError('Login FB Clicked').subscribe();

    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {

        let userID = "0";

        if (res != null) {
          console.log('Logged into Facebook!', JSON.stringify(res));

          userID = res.authResponse.userID;

          console.log('userID found ', JSON.stringify(res));

          this.getFacebookUserDetails(userID, res);
        }
      })
      .catch(e => {
        console.log('Login FB Failed + ' + JSON.stringify(e));
        this.err.logError('Login FB Failed + ' + JSON.stringify(e)).subscribe()
      });

    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  getFacebookUserDetails(userID: string, res: any) {

    this.fb.api('/' + userID + '?fields=id,name,email,first_name,last_name,picture,gender', []).then(data => {
      console.log(data);

      this._userService.AuthenticateThirdPartyUser(data.id).subscribe(sub => {
        console.log("RAW got : " + sub)
        if (sub != null && +sub > 0) {
          console.log("Found the User : " + sub);
          this.storage.set('userID', sub);
          this.ionViewDidLoad();
        }
        else {
          var user = {
            id: -1,
            firstName: data.first_name,
            lastName: data.last_name,
            gender: data.gender == "male" ? "M" : "F",
            email: data.email,
            imageURL: data.picture.data.url,
            thirdPartyAuthID: data.id,
            authenticationPortalID: 2,
            active: true
          }

          console.log(user);

          this._userService.RegisterSocialAuthUser(user).subscribe(sub => {
            console.log("loaded :" + sub);
            this.storage.set('userID', sub);
            this.ionViewDidLoad();
          });
        }
      })

    });
  }

  doDummyLogin() {
    var user = {
      id: -1,
      firstName: "Saeed",
      lastName: "Ansari",
      gender: "male" == "male" ? "M" : "F",
      email: "saedansari@gmail.com",
      imageURL: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/10525797_10152962537591528_3712779174895063807_n.jpg?oh=d0cab2c3e0a6b4d80de9df1369f917ba&oe=59F7E379",
      thirdPartyAuthID: "10155483413286528",
      authenticationPortalID: 2,
      active: true
    }

    console.log(user);

    this._userService.AuthenticateThirdPartyUser(user.thirdPartyAuthID).subscribe(sub => {
      console.log("RAW got : " + sub)
      if (sub != null && +sub > 0) {
        console.log("Found the User : " + sub);
        this.storage.set('userID', sub);
        this.ionViewDidLoad();
      }
      else {
        var user2 = {
          id: -1,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender == "male" ? "M" : "F",
          email: user.email,
          imageURL: user.imageURL,
          thirdPartyAuthID: user.thirdPartyAuthID,
          authenticationPortalID: 2,
          active: true
        }

        console.log(user2);

        this._userService.RegisterSocialAuthUser(user2).subscribe(sub => {
          console.log("loaded :" + sub);
          this.storage.set('userID', sub);
          this.ionViewDidLoad();
        });
      }
    })

  }

  loadForgetPasswordModal() {

    let forgetPasswordModal = this.modalCtrl.create(ForgetPasswordComponent, null, { showBackdrop: true, enableBackdropDismiss: true });
    forgetPasswordModal.present();
  }


  loginClicked() {

    let loginRegisterModal = this.modalCtrl.create(LoginComponent, null, { showBackdrop: true, enableBackdropDismiss: true });

    loginRegisterModal.onDidDismiss(data => {

      if (data) {
        if (data.isRegistering) {
          this.loadRegistrationModal();
        }
        else if (data.forgetPassword) {
          this.loadForgetPasswordModal();
        }
      }
    });
    loginRegisterModal.present();
  }

  loadRegistrationModal() {
    let registerModal = this.modalCtrl.create(RegisterUserComponent, null, { showBackdrop: true, enableBackdropDismiss: true });

    registerModal.onDidDismiss(data => {

      if (data) {
        if (data.id) {
          this.navCtrl.push(UserLocation, data);

        }
      }
    });
    registerModal.present();
  }

 

  ionViewDidLoad() {
    if (!this.userLoaded) {
      if (this.storage.get('userID').then(id => {
        sessionStorage.setItem("userID", id);//Temporary removeit later
        this._userService.getLoggedinInUser().subscribe(s => {
          if (s != null && s.ID > 0) {

            if (s.DefaultCommunityID <= 0) {
              this.navCtrl.push(UserLocation);
            }
            else {

              let communityID = s.DefaultCommunityID;
              this.userLoaded = true;
              this.navCtrl.push(TabsPage, { communityID: communityID });
            }
          }
        });
      }))

        this.err.logError('Login Loaded').subscribe();

      console.log('ionViewDidLoad Login');
    }
  }

  googleLogin() {
    console.log("Google Auth");
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then((result) => {

      console.log("Google logged in")
      console.log(result);
      //The on Change Method in the constructor will get the user to us
    });
  }
}
