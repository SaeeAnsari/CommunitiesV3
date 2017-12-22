import { Component, OnInit, Input} from '@angular/core';

import { UserCommentsComponent } from '../user-comments-component/user-comments-component';
import { StoryService } from '../../providers/story-service';

import { ModalController } from 'ionic-angular';
/**
 * Generated class for the UserPostsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-user-post',
  templateUrl: 'user-posts-component.html',
  providers: [StoryService]
})
export class UserPostsComponent implements OnInit {

  @Input() PostMessage: string = " ";
  @Input() PostMediaURL: string;
  @Input() StoryID: number;
  @Input() CommentCount: number;
  @Input() LikeCount: number;
  @Input() UserID: number;
  @Input() StoryExternalURL: string;
  @Input() MediaType: string;
  @Input() StoryImages;

  public fixedImagesforStory;


  public ngAfterViewInit() {

  }

  constructor(
    public modalCtrl: ModalController,
    public storyService: StoryService
  ) { }

  ngOnInit() {
    if (this.StoryImages.length > 0) {
      this.fixedImagesforStory = this.StoryImages[0];
      console.log(this.PostMessage);
    }

  }

  viewCommentsClicked() {
    this.openComments(this.MediaType);
  }


  //Type : Video or Image
  openComments(type) {

    console.log("upon View click");
    console.log({ storyID: this.StoryID, postMediaURL: type == "Image" ? this.fixedImagesforStory : this.PostMediaURL, postMessage: this.PostMessage, storyExternalURL: this.StoryExternalURL, type: type });

    let commentsModal = this.modalCtrl.create(UserCommentsComponent,
      { storyID: this.StoryID, postMediaURL: type == "Image" ? this.fixedImagesforStory : this.PostMediaURL, postMessage: this.PostMessage, storyExternalURL: this.StoryExternalURL, type: type },
      { showBackdrop: true, enableBackdropDismiss: true });

    commentsModal.onDidDismiss(data => {

      if (data) {
        this.CommentCount = data.commentsCount;
      }
    });
    commentsModal.present();

  }


  launchMaps() {
    
    this.storyService.GetEventAddressByStoryID(+this.StoryID).subscribe(sub => {
      window.open("http://maps.google.com?daddr=" + sub);
    });

  }

}
