import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StoryService } from '../../providers/story-service';
import { UserService } from '../../providers/user-service';
import { Firebase } from '@ionic-native/firebase'

import { PopoverController } from 'ionic-angular';


import { SocialSharingPopoverComponent } from '../../components/social-sharing-popover/social-sharing-popover';


/**
 * Generated class for the UserPostActionComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */

@Component({
  selector: 'app-user-post-action',
  templateUrl: 'user-post-action-component.html',
  providers: [StoryService, UserService]
})
export class UserPostActionComponent implements OnInit {

  @Input() CommentCount: number;
  @Input() LikeCount: number;
  @Input() StoryID: number;
  @Input() UserID: number;
  @Input() MediaType: string;
  @Input() FeedType: string;
  @Input() EventID: string;

  @Output() ViewCommentsClicked = new EventEmitter();

  private likeClicked: boolean = false;


  constructor(private _storyService: StoryService,
    private _userService: UserService,
    public popoverCtrl: PopoverController,
    private firebase: Firebase) { }

  ngOnInit() {
    if (this.FeedType == "") {
      this.FeedType = "Story";
    }
  }

  setLike(storyID: number) {

    this._userService.getLoggedinInUser().subscribe(s => {

      let userID = s.ID;

      this.firebase.subscribe(storyID.toString()).then(data => {
        this._storyService.SetLike(storyID, userID).subscribe(sub => {
          if (sub != undefined && sub == true) {
            this.LikeCount++;
          }
        });
      });      
    });
  }

  viewComments(storyID: number) {

    this.ViewCommentsClicked.emit({
      storyID: storyID
    });
  }

  presentPopover(myEvent) {
    if (this.FeedType == "Event" && this.EventID != '') {
      //Get the EventStoryID
      //Sent the Story to Sharing Control

      this._storyService.GetStoryByEventID(+this.EventID).subscribe(sub => {

        var imageURL = "";
        if (sub.Images.length > 0) {
          imageURL = sub.Images[0];
        }

        let popover = this.popoverCtrl.create(SocialSharingPopoverComponent,
          {
            storyID: sub.ID,
            mediaType: this.MediaType,
            longDescription: sub.LongDescription,
            imageURL: imageURL,
            storyExternalURL: sub.StoryExternalURL
          });
        popover.present({
          ev: myEvent
        });
      });

    }
    else if (this.FeedType == "Story") {

      //Call to get StoryDetails by ID

      this._storyService.GetStory(+this.StoryID).subscribe(sub => {

        var imageURL = "";
        if (sub.Images.length > 0) {
          imageURL = sub.Images[0];
        }

        let popover = this.popoverCtrl.create(SocialSharingPopoverComponent,
          {
            storyID: sub.ID,
            mediaType: this.MediaType,
            longDescription: sub.LongDescription,
            imageURL: imageURL,
            storyExternalURL: sub.StoryExternalURL
          });
        popover.present({
          ev: myEvent
        });
      });
    }
  }

  ionViewDidLoad() {
    console.log("Media TYpe: " + this.MediaType)
  }

  triggerAnimation() {
    this.likeClicked = true;
    setTimeout(() => {
      this.likeClicked = false;
    }, 1000);
  }
}
