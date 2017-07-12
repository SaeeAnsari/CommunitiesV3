import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


import { Observable } from 'rxjs/Rx';
import { UserService } from '../../providers/user-service';

import { MediaPostService } from '../../providers/media-post-service';

/**
 * Generated class for the RegisterUserComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'register-user-component',
  templateUrl: 'register-user-component.html',
  providers: [UserService, MediaPostService]
})
export class RegisterUserComponent {

  public registerationForm: FormGroup;
  private id: number;
  private uploadMessage: string = "Take a Selfie!";
  private isUploadingImage: boolean = false;
  private uploaded: boolean = false;
  private selfieURL: string = "";


  constructor(private _fb: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _userService: UserService,
    private _mediaPost: MediaPostService,
    public vc: ViewController) {
    this.registerationForm = this._fb.group({
      firstName: ['', [<any>Validators.required, <any>Validators.minLength(2)]],
      lastName: ['', [<any>Validators.required, <any>Validators.minLength(2)]],
      email: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  fileChange(event) {

    this.isUploadingImage = true;

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);


      this._mediaPost.postImage(formData, 'User').subscribe(sub => {
        this.uploaded = true;
        this.isUploadingImage = false;

        this.selfieURL = sub;
      });
    }
  }

  saveUser(model, isValid: boolean) {
    if (isValid && isValid == true) {
      if (this.selfieURL != "") {
        model.imageURL = this.selfieURL;
      }

      model.authenticationPortalID = 1;//Custom
      this._userService.RegisterUser(model).subscribe(sub => {
        this.id = +sub;

        sessionStorage.setItem('userID', this.id.toString());
        let data = {
          id:this.id
        };

        this.vc.dismiss(data);

      });
    }
  }

}
