import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { UserCommentsComponent } from '../user-comments-component/user-comments-component';

import { ModalController, NavParams } from 'ionic-angular';
/**
 * Generated class for the UserPostsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-user-post',
  templateUrl: 'user-posts-component.html'
})
export class UserPostsComponent implements OnInit {

  @Input() PostMessage: string;
  @Input() PostMediaURL: string;
  @Input() StoryID: number;
  @Input() CommentCount: number;
  @Input() LikeCount: number;
  @Input() UserID: number;
  @Input() StoryExternalURL: string;
  @Input() MediaType: string;

  private hasImage: boolean = false;

  constructor(
    public modalCtrl: ModalController
    ) { }

  ngOnInit() {
    if (this.PostMediaURL.length > 0) {
      
      this.hasImage = true;
    }
  }

  viewCommentsClicked(){
    this.openComments(this.MediaType);
  }
  

  //Type : Video or Image
  openComments(type) {

    let commentsModal = this.modalCtrl.create(UserCommentsComponent, 
    { storyID: this.StoryID, postMediaURL: this.PostMediaURL, postMessage: this.PostMessage, storyExternalURL : this.StoryExternalURL, type: type }, 
    { showBackdrop: true, enableBackdropDismiss: true });

    commentsModal.onDidDismiss(data => {

      if (data) {
        this.CommentCount = data.commentsCount;
      }
    });
    commentsModal.present();

    //alert('broke this as we need  to IONIZe it');
    /*
    const modalRef = this._modalService.open(UserCommentsComponent, { windowClass: 'dark-modal' } );   
    modalRef.componentInstance.storyID = this.StoryID;
    modalRef.componentInstance.loadComments();
    */
  }

}
