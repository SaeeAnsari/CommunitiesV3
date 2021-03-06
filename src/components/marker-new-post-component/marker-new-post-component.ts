import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { NewCommentComponent } from '../new-comment-component/new-comment-component';
import {NewEventComponent} from '../new-event/new-event';


import { ModalController } from 'ionic-angular';


/**
 * Generated class for the MarkerNewPostComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-marker-new-post',
  templateUrl: 'marker-new-post-component.html',
  providers: [UserService]
})
export class MarkerNewPostComponent implements OnInit {

  @Input() StoryID: number = 0;
  @Input() FeedType: string;
  @Input() CommunityID: number = 0;
  @Output() OnStorySave = new EventEmitter();

  private user;
  constructor(private _userService: UserService, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadNewPostMarker();
  }

  loadNewPostMarker() {
    this._userService.getLoggedinInUser().subscribe(s => {

      this.user = s;

    });
  }

  redirecttoNewPost() {

    if(this.FeedType == "Event"){

      let eventsModal = this.modalCtrl.create(NewEventComponent, { storyID: this.StoryID, FeedType: this.FeedType }, 
        { showBackdrop: true, enableBackdropDismiss: true });

        eventsModal.onDidDismiss(data => {

        if (data) {
          this.StoryID = data.storyID;
          this.OnStorySave.emit();
        }
      });
      eventsModal.present();
    }
    else{

    
    
      let commentsModal = this.modalCtrl.create(NewCommentComponent, { storyID: this.StoryID, FeedType: this.FeedType ,CommunityID: this.CommunityID }, 
        { showBackdrop: true, enableBackdropDismiss: true });

      commentsModal.onDidDismiss(data => {

        if (data) {
          this.StoryID = data.storyID;
          this.OnStorySave.emit();
        }
      });
      commentsModal.present();
    }
  }

}
