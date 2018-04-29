import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { StoryService } from '../../providers/story-service';


import { User } from '../interfaces/user';
import { MediaPostService } from '../../providers/media-post-service';
import { CommunityService } from '../../providers/community-service';
import { UserService } from "../../providers/user-service";

import { CameraPluginProvider } from '../../providers/camera-plugin/camera-plugin';


import { ViewController, NavParams, NavController, Events } from 'ionic-angular';
import { OpenGraphServiceProvider } from '../../providers/open-graph-service/open-graph-service';

import { Keyboard } from '@ionic-native/keyboard';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FirebaseMessagingProvider } from '../../providers/firebase-messaging/firebase-messaging';




@Component({
  selector: 'new-comment-component',
  templateUrl: 'new-comment-component.html',
  providers: [UserService, FirebaseMessagingProvider, StoryService, MediaPostService, CommunityService, OpenGraphServiceProvider, CameraPluginProvider]
})
export class NewCommentComponent implements OnInit {


  private user;
  public uploaded: boolean = false;
  private postText: string = "";
  private postTextUploaded: string = "";
  public mediaType: string = "";
  public uploadedMediaURL: string = "";


  public videoObj: any;
  public imageListObj = [];

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
  private graphExternalURL: string = "";
  private videoMimeType: string = "";


  private keyboardShowing: boolean;




  constructor(
    private _userService: UserService,
    private _storyService: StoryService,
    private _mediaPost: MediaPostService,
    private _community: CommunityService,
    public nav: NavController,
    public vc: ViewController,
    public navParams: NavParams,
    private _openGraphApi: OpenGraphServiceProvider,
    private transfer: FileTransfer,
    private file: File,
    private cameraPluginServices: CameraPluginProvider,
    private keyboard: Keyboard,
    private fcm: FirebaseMessagingProvider,
    private ev: Events
  ) {


  }

  ngOnInit() {
    this.keyboard.disableScroll(true);
    this.keyboard.onKeyboardShow().subscribe(sub => {
      this.keyboardShowing = true;
    });

    this.keyboard.onKeyboardHide().subscribe(sub => {
      this.keyboardShowing = false;
    });


    this._userService.getLoggedinInUser().subscribe(sub => {

      this.user = {
        id: sub.ID,
        displayName: sub.DisplayName,
        imageURL: sub.ImageURL,
        defaultCommunityID: sub.DefaultCommunityID
      };

      this.activeCommunity = this.user.defaultCommunityID;

      if (this.navParams.get("CommunityID")) {
        this.activeCommunity = this.navParams.get("CommunityID");
      }

      /*
      if (sessionStorage.getItem("activeCommunity") != null) {

        this.activeCommunity = sessionStorage.getItem("activeCommunity").toString();
      }
      */
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
              this.graphFound = true;
              this.graphExternalURL = sub.hybridGraph.url;

              this.postText = this.graphTitle;
              this.mediaType = "Image";

              if (this.graphImage.length > 0) {
                this.imageListObj.push(
                  {
                    id: -1,
                    url: this.graphImage
                  }
                )
              }
            }
          });
        }
      });
  }


  mediaSelectedForPosting(data) {

    if (data != null) {
      console.log("Got Data: " + JSON.stringify(data));

      if (data.mediaType == "Video") {

        this.videoObj = {
          id: -1,
          url: data.fileName,
          name: data.name,
          publicID: data.publicID,
          versionID: data.versionID
        }

       

        this.uploadedMediaURL = data.fileName;
        this.videoMimeType = data.mimeType;
      }
      else if (data.mediaType == "Image") {

        data.imageList.forEach(element => {
          this.imageListObj.push(
            {
              id: -1,
              url: element.fileName,
              publicID: element.publicID,
              versionID: element.versionID
            }
          )

          this.uploadedMediaURL = element.fileName;
        });

      }

      this.mediaType = data.mediaType;
      this.uploaded = true;
    }
  }

  post() {

    if (this.user && (this.postText != '' || (this.imageListObj != null && this.imageListObj.length > 0) || this.videoObj != null)) {

      let storyText = this.postText == "" ? this.postTextUploaded : this.postText;


      if (this.videoObj != null && this.mediaType == "Video") {
        let videoPost = {
          UserID: this.user.id,
          StoryText: storyText,
          MediaType: this.mediaType,
          OptionsModel: this.optionsModel,
          ImageListObj: this.imageListObj,
          GraphExternalURL: this.graphExternalURL,
          UploadedMediaURL: this.uploadedMediaURL,
          VideoMimeType: this.videoMimeType,

        };

        let id = 0;
        this.uploaded = false;
        this.postText = "";
        this.postTextUploaded = "";
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

        this.ev.publish('newVideoUpload', JSON.stringify(videoPost));
      }
      else {
        this._storyService.SavePost(this.user.id,
          storyText, this.mediaType, this.optionsModel, this.videoObj, this.imageListObj, this.graphExternalURL).subscribe(sub => {
            let id = sub;
            this.uploaded = false;
            this.postText = "";
            this.postTextUploaded = "";
            this.mediaType = "";
            this.videoSelected = false;
            this.imageSelected = false;

            this.fcm.SubscibeToTopic(id.toString());

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
  }


  closeModal() {

    this.vc.dismiss();
  }


}
