import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StoryService } from '../../providers/story-service';
import { UserService } from '../../providers/user-service';
import { UserCommentsComponent } from '../user-comments-component/user-comments-component';

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
  templateUrl: 'user-post-action-component.html'
})
export class UserPostActionComponent implements OnInit {

  @Input() CommentCount: number;
  @Input() LikeCount: number;
  @Input() StoryID: number;
  @Input() UserID: number;
  @Input() MediaType: string;

  @Output() ViewCommentsClicked = new EventEmitter();


  constructor(private _storyService: StoryService,
    private _userService: UserService,
    public popoverCtrl: PopoverController) { }

  ngOnInit() {

  }

  setLike(storyID: number) {

    this._userService.getLoggedinInUser().subscribe(s => {

      let userID = s.ID;

      this._storyService.SetLike(storyID, userID).subscribe(sub => {
        if (sub != undefined && sub == true) {
          this.LikeCount++;
        }
      });
    });
  }

  viewComments(storyID: number) {

    this.ViewCommentsClicked.emit({
      storyID: storyID
    });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(SocialSharingPopoverComponent, { storyID: this.StoryID, mediaType: this.MediaType });
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidLoad() {
    console.log("Media TYpe: " + this.MediaType)
  }

}
