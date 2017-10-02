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

import {Keyboard} from '@ionic-native/keyboard';

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
  public mediaName: string = "";
  public mediaType: string = "";
  public cloudinaryPublicID: string = "";
  public cloudinaryVersionID: string = "";

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

  public uploadedMediaURL: string = "";

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
    this.keyboard.onKeyboardShow().subscribe(sub=>{
      this.keyboardShowing = true;
    });

    this.keyboard.onKeyboardHide().subscribe(sub=>{
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
            }
          });
        }
      });
  }

  public async launchCamera() {

    try {

      let orignal = await this.cameraPluginServices.open_camera();

      console.log(orignal);

      this.upload(orignal);

    }
    catch (e) {

      console.log("Error : " + e);

    }

  }

  public async upload(cameraImageURL) {
    this.imageSelected = true;
    this.uploaded = false;

    console.log("In the Upload Method :  " + cameraImageURL);
    let options = {
      fileKey: 'file',
      fileName: cameraImageURL.split('/').pop(),
      mimeType: 'image/jpeg',
      chunkedMode: false,
      headers: {
        'Content-Type': undefined
      },
      params: {}
    };

    try {
      console.log("About to call the Upload Method : " + JSON.stringify(options));

      let url = BaseLinkProvider.GetBaseUrl() + "/Image";

      console.log("URL : " + url);

      let result = await this.file_transfer.upload(
        encodeURI(cameraImageURL),
        encodeURI(url),
        options,
        false
      );


      var parsingString = result.response;
      var fileName = parsingString.split("FileName")[parsingString.split("FileName").length - 2].replace(">", "").replace("<", "").replace("/", "");
      this.uploaded = true;

      this.mediaName = fileName;
      this.mediaType = "Image";
      this.uploadedMediaURL = BaseLinkProvider.GetMediaURL() + 'MediaUpload/Story/Thumb/' + fileName;

    } catch (e) {
      console.log("Error : " + JSON.stringify(e));

    }
  }


  mediaSelectedForPosting(data) {

    console.log("inside the imageSelectedForPosting");
    if(data!= null){
      console.log("Got Data: " + JSON.stringify(data));
      
      this.uploadedMediaURL = data.fullPathFileName;
      this.mediaName = data.fileName;
      this.mediaType = data.mediaType;
      this.cloudinaryPublicID = data.publicID;
      this.cloudinaryVersionID = data.versionID;

      this.uploaded = true;
      
      this.hideEventsSection = true;

    }
  }

  post() {

    if (this.user && (this.postText != '' || this.mediaName != ''|| this.postTextUploaded != '')) {

      let extMediaURL = "";
      if (this.graphImage.length > 0) {
        extMediaURL = this.graphImage;
      }
      else if(this.uploadedMediaURL != ''){
        extMediaURL = this.uploadedMediaURL;
      }

      let storyText = this.postText == ""? this.postTextUploaded : this.postText;


      this._storyService.SavePost(this.user.id, storyText, this.mediaType, this.mediaName, this.optionsModel, extMediaURL, this.graphExternalURL, this.cloudinaryPublicID, this.cloudinaryVersionID).subscribe(sub => {
        let id = sub;
        this.uploaded = false;
        this.postText = "";
        this.postTextUploaded = "";
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
  

  closeModal() {

    this.vc.dismiss();
  }


}
