import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { NewCommentComponent } from '../new-comment-component/new-comment-component';



import { ModalController, NavParams } from 'ionic-angular';


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

    let commentsModal = this.modalCtrl.create(NewCommentComponent, { storyID: this.StoryID }, { showBackdrop: true, enableBackdropDismiss: true });

    commentsModal.onDidDismiss(data => {

      if (data) {
        this.StoryID = data.storyID;
        this.OnStorySave.emit();
      }
    });
    commentsModal.present();

  }

}
