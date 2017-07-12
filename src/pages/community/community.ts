import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { CommunityService } from '../../providers/community-service';
import { MediaPostService } from '../../providers/media-post-service';
import { UserService } from '../../providers/user-service';
import { GeoProviderServiceProvider } from '../../providers/geo-provider-service/geo-provider-service';

import { Geolocation } from '@ionic-native/geolocation';


import { UserSearchComponent } from '../user-search-component/user-search-component';


/**
 * Generated class for the Community page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-community',
  templateUrl: 'community.html',
  providers: [CommunityService, MediaPostService, UserService, GeoProviderServiceProvider]
})
export class CommunityPage implements OnInit {

  public communityForm: FormGroup;
  public events: any[] = []; // use later to display form changes

  private id: number;
  name: string;
  private subscription;
  private isUploadingImage = false;
  private communityImage: string = '';
  private uploadMessage: string = '';
  private uploaded: boolean = false;
  private location;


  constructor(
    private _fb: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _communityService: CommunityService,
    private _mediaPost: MediaPostService,
    private _userService: UserService,
    private _geoService: GeoProviderServiceProvider,
    private _geolocation: Geolocation
  ) {
  }

  ngOnInit() {
    this.communityForm = this._fb.group({
      name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
      description: [''],
      zip_postal: ['', [<any>Validators.required, <any>Validators.minLength(7)]]
    });

    if (this.navParams.get('communityID')) {
      this.id = +this.navParams.get("communityID");
      this.loadCommunity();
    }
  }


  saveCommunity(model, isValid: boolean) {
    if (this.id > 0 && this.id != undefined) {
      model.id = this.id;
    }


    if (this.communityImage != undefined && this.communityImage.length > 0) {
      model.imageURL = this.communityImage;
    }

    this._userService.getLoggedinInUser().subscribe(s => {
      let userID = s.ID;

      model.location = null;

      if (this.location != null) {
        model.location = this.location;
        this.SaveCommunityFinal(model, userID)
      }

      else if (model.zip_postal.length > 2) {
        this._geoService.GetLatLongDetails(model.zip_postal).subscribe(sub => {


          if (sub.results.length > 0) {
            this.location = { lat: sub.results[0].geometry.location.lat, lng: sub.results[0].geometry.location.lng };
            model.location = this.location;
          }
          else if (this.location != null) {
            model.location = this.location;
          }

          this.SaveCommunityFinal(model, userID)

        });
      }
      else{
        this.SaveCommunityFinal(model, userID)
      }
    });
  }

  SaveCommunityFinal(model, userID) {
    this._communityService.SaveCommunity(model, userID)
      .subscribe(sub => {
        this.id = sub;

        this.navCtrl.push(UserSearchComponent, { communityID: this.id });
      })
  }

  fileChange(event) {

    this.isUploadingImage = true;

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);


      this._mediaPost.postImage(formData, 'Community').subscribe(sub => {
        this.uploaded = true;
        this.isUploadingImage = false;
        this.loadCommunity();

        this.communityImage = sub;
      });
    }
  }

  loadCommunity() {
    if (this.id > 0) {
      this._communityService.GetCommunity(this.id).subscribe(sub => {
        this.communityForm.controls['name'].setValue(sub.Name);
        this.communityForm.controls['description'].setValue(sub.Description);
      });

      this.uploadMessage = "Update?";
    }
    else {
      this.uploadMessage = "Gotta have a Picture!"
    }
  }

  locateMe() {
    this._geolocation.getCurrentPosition().then((resp) => {

      this.location = { lat: resp.coords.latitude, lng: resp.coords.longitude };

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Community');
  }

}
