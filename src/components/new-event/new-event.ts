import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { OpenGraphServiceProvider } from '../../providers/open-graph-service/open-graph-service';
import { MediaPostService } from '../../providers/media-post-service';
import { BaseLinkProvider } from '../../providers/base-link/base-link';
import { UserService } from "../../providers/user-service";
import { EventProvider } from '../../providers/event/event';

import { LoadingController, ViewController, NavParams, NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera'

/**
 * Generated class for the NewEventComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'new-event',
  templateUrl: 'new-event.html',
  providers: [Camera, MediaPostService, UserService, EventProvider]
})
export class NewEventComponent implements OnInit {

  public newEventForm: FormGroup;

  private postText: string = "";
  private eventCountry;
  private mediaName: string = "";
  private uploadedMediaURL: string = "";

  private user;

  private uploaded: true;

  private graphImage: string = "";

  ngOnInit() {
    this._userService.getLoggedinInUser().subscribe(sub => {
      this.user = {
        id: sub.ID,
        displayName: sub.DisplayName,
        imageURL: sub.ImageURL,
        defaultCommunityID: sub.DefaultCommunityID
      };
    });
  }


  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private camera: Camera,
    private _openGraphApi: OpenGraphServiceProvider,
    private _mediaPost: MediaPostService,
    public loadingCtrl: LoadingController,
    private _eventService: EventProvider,
    public nav: NavController,
    public vc: ViewController,
  ) {

    this.newEventForm = this._fb.group({
      link: [''],
      name: ['', [<any>Validators.required, <any>Validators.minLength(2)]],
      description: [''],
      address: ['', [<any>Validators.required, <any>Validators.minLength(2)]],
      city: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      zip: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
      country: ['', [<any>Validators.required]]
    });

    this.newEventForm.controls['link'].valueChanges.debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(sub => {
        console.log('changed');
        this.listenToGraph();
      });
  }

  launchCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }


  listenToGraph() {
    let uri = this._openGraphApi.checkIfURLExist(this.postText);

    if (uri != "") {
      this._openGraphApi.GetOpenGraphDetails(uri).subscribe(sub => {
        if (sub.hybridGraph) {

          this.graphImage = sub.hybridGraph.image;
          this.newEventForm.controls['name'].setValue(sub.hybridGraph.title);
          this.newEventForm.controls['description'].setValue(sub.hybridGraph.description);
        }
      });
    }
  }


  imageFileChange(event) {

    let loader = this.loadingCtrl.create({
      content: "Saving...",
      enableBackdropDismiss: true,
      duration: 3000
    })

    loader.present();

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);

      this._mediaPost.postImage(formData, 'Story').subscribe(sub => {

        this.mediaName = sub;

        this.uploadedMediaURL = BaseLinkProvider.GetMediaURL() + 'MediaUpload/Story/Thumb/' + sub;
      });
    }
    loader.dismiss();
  }

  mediaSelectedForPosting(data) {

    console.log("inside the imageSelectedForPosting");
    if (data != null) {
      console.log("Got Data: " + JSON.stringify(data));

      this.uploaded = true;

      this.mediaName = data.fileName;

      this.uploadedMediaURL = BaseLinkProvider.GetMediaURL() + 'MediaUpload/Story/' + data.fileName;
    }
  }


  saveEvent(model, isValid: boolean) {
    console.log("in the save event button");
    console.log("is it valid : " + isValid);
    console.log(model);

    if (isValid && isValid == true) {
      console.log("inside the save event");

      if (this.user) {

        let imgURL = "";
        if (this.graphImage.length > 0) {
          imgURL = this.graphImage;
        }
        else if (this.mediaName.length > 0) {
          imgURL = this.uploadedMediaURL;
        }

        imgURL = this.uploadedMediaURL = BaseLinkProvider.GetMediaURL() + 'MediaUpload/Story/2599eca0-15f1-4996-b44f-e5db61185358.jpg';

        this._eventService.PostEvent(-1,
          model.name,
          model.description,
          imgURL,
          true,
          this.user.id,
          model.address,
          model.city,
          model.zip,
          model.country,
          model.link)
          .subscribe(sub => {
            console.log("What we got is " + sub);
            let id = sub;
            this.vc.dismiss({ storyID: id });//this is false but hoping the live feed will just reload :)
          });
      }
    }
  }

}
