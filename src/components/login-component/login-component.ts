import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';

import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'login-component',
  templateUrl: 'login-component.html',
  providers: [UserService]
})
export class LoginComponent {

  text: string;

  private email: string;
  private password: string;

  constructor(
    private _user: UserService,
    public nav: NavController,
    public vc: ViewController,
    public navParams: NavParams) {

  }

  closeModal() {

    this.vc.dismiss();
  }

  registerClicked() {
    let data = {
      isRegistering: true
    };

    this.vc.dismiss(data);
  }

  loginUser() {


    if (this.email.length > 0 && this.password.length > 0) {
      this._user.LoginUser(this.email, this.password).subscribe(sub => {
        if (sub > 0) {
          sessionStorage.setItem("userID", sub);
          this.nav.push(TabsPage);
        }
      })
    }

  }


}
