import { Component } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { ViewController, NavParams, NavController, ToastController } from 'ionic-angular';



/**
 * Generated class for the ForgetPasswordComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'forget-password',
  templateUrl: 'forget-password.html',
  providers: [UserService]

})
export class ForgetPasswordComponent {

  public email = "";

  text: string;

  constructor(
    private _user: UserService,
    public vc: ViewController,
    private toastCtrl: ToastController
  ) {

  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  sendForgetPassEmail() {
    if (this.email != "") {
      this._user.EmailUserForgetPassword(this.email).subscribe(sub => {

        this.presentToast("Email sent to " + this.email);

        this.vc.dismiss();
        /*
        setTimeout(function () {
          this.vc.dismiss();
        }, 4000);
        */

      })
    }
    else {
      this.presentToast("Please enter an Email you registered with Communities");
    }
    console.log(this.email);
  }
}
