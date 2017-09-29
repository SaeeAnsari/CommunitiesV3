import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BaseLinkProvider } from '../../providers/base-link/base-link';

import { StoryService } from '../../providers/story-service';


import { UserPost } from '../interfaces/user-post';
import { User } from '../interfaces/user';
import { MediaPostService } from '../../providers/media-post-service';
import { CommunityService } from '../../providers/community-service';
import { UserService } from "../../providers/user-service";

import { CameraPluginProvider } from '../../providers/camera-plugin/camera-plugin';
import { HelperProvider } from '../../providers/helper/helper';
import { UploadImage } from '../../interfaces/upload-image';


import { ViewController, NavParams, NavController } from 'ionic-angular';
import { OpenGraphServiceProvider } from '../../providers/open-graph-service/open-graph-service';

import { Keyboard } from '@ionic-native/keyboard';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';


import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


import * as xml2js from 'xml2js';



@Component({
  selector: 'new-comment-component',
  templateUrl: 'new-comment-component.html',
  providers: [UserService, StoryService, MediaPostService, CommunityService, OpenGraphServiceProvider, CameraPluginProvider]
})
export class NewCommentComponent implements OnInit {


  private user;
  public uploaded: boolean = false;
  private postText: string = "";
  private postTextUploaded: string = "";
  public mediaType: string = "";
  public uploadedMediaURL :string = "";


  public videoObj: any;
  public imageListObj= [];

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

  private createNewEvent: boolean = false;

  private hideEventsSection: boolean = false;

  private keyboardShowing: boolean;

  private firebaseToken = "";

  private captureDataUrl: string = "";

  private file_transfer: FileTransferObject = this.transfer.create();


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
    private transfer: FileTransfer,
    private file: File,
    private cameraPluginServices: CameraPluginProvider,
    private keyboard: Keyboard
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

    console.log("inside the imageSelectedForPosting");
    if (data != null) {
      console.log("Got Data: " + JSON.stringify(data));

      if (data.mediaType == "Video") {
        this.videoObj = {
          id: -1,
          url: data.fileName,
          publicID: data.publicID,
          versionID: data.versionID
        }
        this.uploadedMediaURL = data.fileName;
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
      this.hideEventsSection = true;
    }
  }

  post() {

    if (this.user && (this.postText != '' || this.imageListObj != null || this.videoObj != null)) {     
      
      let storyText = this.postText == "" ? this.postTextUploaded : this.postText;

      this._storyService.SavePost(this.user.id,
        storyText, this.mediaType, this.optionsModel, this.videoObj, this.imageListObj, this.graphExternalURL).subscribe(sub => {
          let id = sub;
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
        });
    }
  }


  closeModal() {

    this.vc.dismiss();
  }


}
