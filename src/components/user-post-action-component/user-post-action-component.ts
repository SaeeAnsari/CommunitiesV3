import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { StoryService } from '../../providers/story-service';
import { UserService } from '../../providers/user-service';
import { UserCommentsComponent } from '../user-comments-component/user-comments-component';


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


  constructor(private _storyService: StoryService, private _userService: UserService, ) { }

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

    alert('broke this popup as we need to ionicize it');
    /*
        const modalRef = this._modalService.open(UserCommentsComponent, { windowClass: 'dark-modal' });
        modalRef.componentInstance.storyID = storyID;
        modalRef.componentInstance.loadComments();
    */
  }

}
