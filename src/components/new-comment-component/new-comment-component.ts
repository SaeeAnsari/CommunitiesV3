import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BaseLinkProvider } from '../../providers/base-link/base-link';

import { StoryService } from '../../providers/story-service';


import { UserPost } from '../interfaces/user-post';
import { User } from '../interfaces/user';
import { MediaPostService } from '../../providers/media-post-service';
import { CommunityService } from '../../providers/community-service';
import { UserService } from "../../providers/user-service";


import { ViewController, NavParams, NavController } from 'ionic-angular';
import { OpenGraphServiceProvider } from '../../providers/open-graph-service/open-graph-service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';


import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

import { Firebase } from '@ionic-native/firebase';
import { firebase } from 'firebase';


/**
 * Generated class for the NewCommentComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'new-comment-component',
  templateUrl: 'new-comment-component.html',
  providers: [UserService, StoryService, MediaPostService, CommunityService, OpenGraphServiceProvider]
})
export class NewCommentComponent implements OnInit {


  private user;
  private isUploadingImage: boolean = false;
  private uploaded: boolean = false;
  private postText: string = "";
  private mediaName: string = "";
  private mediaType: string = "";

  private videoSelected: boolean = false;
  private imageSelected: boolean = false;

  private activeCommunity;

  private userCommunities = [];

  PostTextControl = new FormControl();


  private optionsModel: number[] = [];


  private graphFound: boolean = false;
  private graphDescription: string = "";
  private graphTitle: string = "";
  private graphImage: string = "";
  private graphVideo: string = "";
  private graphExternalURL: string = "";

  private uploadedMediaURL: string = "";

  private createNewEvent: boolean = false;

  private firebaseToken = "";


  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _storyService: StoryService,
    private _mediaPost: MediaPostService,
    private _community: CommunityService,
    public nav: NavController,
    public vc: ViewController,
    public navParams: NavParams,
    private _openGraphApi: OpenGraphServiceProvider,
    private mediaCapture: MediaCapture,
    private _firebase: Firebase
  ) {

  }

  ngOnInit() {
    this._userService.getLoggedinInUser().subscribe(sub => {

      this.user = {
        id: sub.ID,
        displayName: sub.DisplayName,
        imageURL: sub.ImageURL,
        defaultCommunityID: sub.DefaultCommunityID
      };

      this.activeCommunity = this.user.defaultCommunityID;

      if (sessionStorage.getItem("activeCommunity") != null) {

        this.activeCommunity = sessionStorage.getItem("activeCommunity").toString();
      }

      this.optionsModel.push(this.activeCommunity);

      this._community.GetUserCommunities(this.user.id).subscribe(sub => {

        this.userCommunities = [];

        //set the array
        sub.forEach(element => {

          this.userCommunities.push({ id: element.ID, name: element.Name });
        });


      });
    });

    this.listenToGraph();

    this._firebase.getToken().then(token => {
      this.firebaseToken = token;
    })
      .catch(error => {
        console.error('Error getting token', error)
      });

    this._firebase.onTokenRefresh()
      .subscribe((token: string) => {
        this.firebaseToken = token;
        console.log(`Got a new token ${token}`)
      });
  }

  listenToGraph() {
    this.PostTextControl.valueChanges
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(va => {
        let uri = this._openGraphApi.checkIfURLExist(this.postText);

        if (uri != "") {
          this._openGraphApi.GetOpenGraphDetails(uri).subscribe(sub => {
            if (sub.hybridGraph) {
              this.graphDescription = sub.hybridGraph.description;
              this.graphTitle = sub.hybridGraph.title;
              this.graphImage = sub.hybridGraph.image;
              //this.graphVideo = sub.hybridGraph.url;
              this.graphFound = true;
              this.graphExternalURL = sub.hybridGraph.url;

              this.postText = this.graphTitle;
              this.mediaType = "Image";
            }
          });
        }
      });
  }

  launchCamera() {

    console.log('inside launch Camera v2');
    let options: CaptureImageOptions = { limit: 1 };
    this.mediaCapture.captureImage(options)
      .then(
      (data: MediaFile[]) => {
        console.log('here');
        console.log(data);

        console.log(data.length);

        if (data.length > 0) {
          data[0].getFormatData(raw => {
            
          });
        }
      },
      (err: CaptureError) => console.error(err)
      );
  }

  post() {

    if (this.user && (this.postText != '' || this.mediaName != '')) {

      let extImageURL = "";
      if (this.graphImage.length > 0) {
        extImageURL = this.graphImage;
      }

      this._storyService.SavePost(this.user.id, this.postText, this.mediaType, this.mediaName, this.optionsModel, extImageURL, this.graphExternalURL).subscribe(sub => {
        let id = sub;
        this.isUploadingImage = false;
        this.uploaded = false;
        this.postText = "";
        this.mediaName = "";
        this.mediaType = "";
        this.videoSelected = false;
        this.imageSelected = false;

        this.vc.dismiss({ storyID: id });


        this.optionsModel = [];
        this.optionsModel.push(this.user.defaultCommunityID);

        if (this.user.defaultCommunityID > 0) {

          let activeCommunity = this.user.defaultCommunityID;

          if (sessionStorage.getItem("activeCommunity") != null) {

            activeCommunity = +sessionStorage.getItem("activeCommunity")
          }

        }
      });
    }
  }

  imageFileChange(event) {
    this.imageSelected = true;
    this.uploaded = false;
    this.isUploadingImage = true;

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);


      this._mediaPost.postImage(formData, 'Story').subscribe(sub => {
        this.uploaded = true;
        this.isUploadingImage = false;

        this.mediaName = sub;
        this.mediaType = "Image";
        this.uploadedMediaURL = BaseLinkProvider.GetMediaURL() + 'MediaUpload/Story/Thumb/' + sub;
      });
    }
  }

  videoFileChange(event) {
    this.videoSelected = true;
    this.uploaded = false;
    this.isUploadingImage = true;

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);


      this._mediaPost.postVideo(formData).subscribe(sub => {
        this.uploaded = true;
        this.isUploadingImage = false;

        this.mediaName = sub;
        this.mediaType = "Video";
      });
    }
  }

  closeModal() {

    this.vc.dismiss();
  }


  uploadMedia(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      if (file.name.toLowerCase().endsWith('.avi') || file.name.toLowerCase().endsWith('.mpeg')) {
        this.videoFileChange(event);
      }
      else {
        this.imageFileChange(event);
      }
    }
  }

}
