import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { ViewController, NavParams, NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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
  public loginForm: FormGroup;


  constructor(
    private storage: Storage,
    private _fb: FormBuilder,
    private _user: UserService,
    public nav: NavController,
    public vc: ViewController,
    public navParams: NavParams,
    private toastCtrl: ToastController) {

    this.loginForm = this._fb.group({
      email: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
      password: ['', [<any>Validators.required, <any>Validators.minLength(5)]]
    });

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

  loginUser(model, isValid: boolean) {

    console.log(model);
    if (isValid && isValid == true) {
      this._user.LoginUser(model.email, model.password).subscribe(sub => {
        if (sub > 0) {
          this.storage.set("userID", sub);
          sessionStorage.setItem("userID", sub);//Temporary removeit later
          this.nav.push(TabsPage);
        }
        else{
          this.presentToast("Incorrect Email or Password");
        }
      })
    }    
  }

  presentToast(message:string) {
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

}
