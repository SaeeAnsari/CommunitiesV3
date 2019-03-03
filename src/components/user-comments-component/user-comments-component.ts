import { Component, OnInit, Input } from '@angular/core';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { CommentService } from '../../providers/comment-service';
import { UserService } from '../../providers/user-service';
import { StoryService } from '../../providers/story-service';
import { FirebaseMessagingProvider } from '../../providers/firebase-messaging/firebase-messaging';
import { Platform, ViewController, NavParams, NavController } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

/**
 * Generated class for the UserCommentsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-user-comments',
  templateUrl: 'user-comments-component.html',
  providers: [UserService, CommentService, StoryService, InAppBrowser, FirebaseMessagingProvider]
})
export class UserCommentsComponent implements OnInit {


  public MediaType: string = "Image";

  ngOnInit(): void {
    if (this.navParams.get('storyID')) {
      this.storyID = this.navParams.get('storyID');
      this.loadComments();
    }

    if (this.navParams.get("postMediaURL")) {
      this.postMediaURL = this.navParams.get("postMediaURL");


      console.log("Post Media URL");
      console.log(this.postMediaURL);
    }

    if (this.navParams.get("postMessage")) {
      this.postMessage = this.navParams.get("postMessage");
      
    }

    if (this.navParams.get("storyExternalURL")) {
      this.storyExternalURL = this.navParams.get("storyExternalURL");
    }

    if (this.navParams.get("type")) {
      this.MediaType = this.navParams.get("type");
    }

    if (this.navParams.get("eventID")) {
      this.eventID = this.navParams.get("eventID");
    }   

    if (this.navParams.get("eventAddress")) {
      this.eventAddress = this.navParams.get("eventAddress");
    }
    
    if (this.navParams.get("eventDate")) {
      this.eventDate = this.navParams.get("eventDate");
    }    
  }

  private commentPost: string;
  private comments = [];
  private postMediaURL;//Collection of images for a post
  private postMessage: string;
  private storyExternalURL: string = "";
  private eventAddress: string = "";
  private eventDate: string = "";
  private eventID: number;
  private replyParentID: number;

  @Input() storyID: number;

  constructor(
    private _commentService: CommentService,
    private _userService: UserService,
    private _storyService: StoryService,
    public nav: NavController,
    public vc: ViewController,
    public navParams: NavParams,
    private iab: InAppBrowser,
    private platform: Platform,
    private launchNavigator: LaunchNavigator
    
  ) {


  }

  loadComments() {
    this.comments = [];
    

    if (this.storyID != null && this.storyID > 0) {
      this._commentService.GetStoryComments(this.storyID).subscribe(comm => {
        comm.forEach(element => {
          let comment = {
            user: {
              id: element.User.ID,
              displayName: element.User.DisplayName,
              imageURL: element.User.ImageURL
            },
            id: element.ID,
            storyID: element.StoryID,
            comment: element.Comments,
            timestamp: element.Timestamp,
            commentParentID: element.CommentParentID,
            displayTimeDiff: "",
            actions: {
              supportCount: element.CommentSummary.SupportCount > 0 && element.CommentSummary.SupportCount || ''
            }
          }          

          var tmpDate = new Date(comment.timestamp);
          var nowDate = new Date();
          
          //if same day
          if(tmpDate.toDateString() == nowDate.toDateString()){
            var hours: number = nowDate.getHours() - tmpDate.getHours();
            if(hours > 0){
              comment.displayTimeDiff = hours + " hr";
            }
            else{
              var minutes: number = nowDate.getMinutes() - tmpDate.getMinutes();
              comment.displayTimeDiff = minutes + " min";  
            }
          }
          else {
            var days = ((nowDate.valueOf() - tmpDate.valueOf())/86400000).toFixed();
            comment.displayTimeDiff = days + " days";
          }  
          
          //comment.toDisplayText
          this.comments.push(comment);
        });
      });
    }
  }

  closeModal() {
    let data = {
      storyID: this.storyID,
      commentsCount: this.comments.length
    };
    this.vc.dismiss(data);
  }

  setLike(storyID: number, commentID: number) {
      let userID = this._userService.GetLoggedInUserID();
      let elemIndex = -1;
      this._storyService.SetLike(storyID, userID, commentID).subscribe(sub => {
        if (sub != undefined && sub == true) {

          this.comments.forEach(function (element, index) {
            if (element.id == commentID) {
              elemIndex = index;
            }
          });

          this.comments[elemIndex].actions.supportCount++;
        }
      });
    
  }

  setReply(storyID: number, commentID: number){
   this.replyParentID = commentID; 
  }

  

  launch() {

    if (this.storyExternalURL != "") {
      this.iab.create(this.storyExternalURL);
    }
  }


  postComment() {
    if (this.storyID != null && this.storyID > 0) {

      let userID = this._userService.GetLoggedInUserID();
      this._commentService.PostComment(this.storyID, userID, this.commentPost, this.replyParentID).subscribe(ret => {

        this.loadComments();
        this.replyParentID = null;
        this.commentPost = "";
      });

    }
  }

  launchMaps() {

    console.log("Event Address: " + this.eventAddress);

    this.launchNavigator.navigate(this.eventAddress).then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }
}
