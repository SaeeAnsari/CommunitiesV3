import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { UserCommentsComponent } from '../user-comments-component/user-comments-component';
import { StoryService } from '../../providers/story-service';
import { EventProvider } from '../../providers/event/event';
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
  providers: [StoryService, EventProvider]
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
  @Input() EventID: number;

  public fixedImagesforStory;

  public EventAddress: string;
  public EventDate: string;

  public ngAfterViewInit() {
    var el = this.elemRef.nativeElement.querySelector('.addressSection');

  }

  constructor(
    public modalCtrl: ModalController,
    public storyService: StoryService,
    public elemRef: ElementRef,
    public eventService: EventProvider,
    private launchNavigator: LaunchNavigator
  ) { }

  ngOnInit() {
    if (this.StoryImages.length > 0) {
      this.fixedImagesforStory = this.StoryImages[0];
      console.log(this.PostMessage);
    }

    if (this.EventID > 0) {
      this.eventService.GetEvent(this.EventID).subscribe(sub => {
        this.EventAddress = sub.Address + " " + sub.City;

        var dtStartString = sub.EventStartDate;
        var dtEndString = sub.EventEndDate;

        var dtStart = new Date(dtStartString);
        var dtEnd = new Date(dtEndString);

        if (dtStartString != dtEndString) {
          this.EventDate = dtStart.toLocaleDateString('en-US') + " to " + dtEnd.toLocaleDateString('en-US');
        }
        else {
          this.EventDate = dtStart.toLocaleDateString('en-US');
        }

        //this.EventDate
      });
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
      { storyID: this.StoryID, postMediaURL: type == "Image" ? this.fixedImagesforStory : this.PostMediaURL, postMessage: this.PostMessage, storyExternalURL: this.StoryExternalURL, type: type, eventAddress: this.EventAddress, eventDate: this.EventDate, eventID: this.EventID },
      { showBackdrop: true, enableBackdropDismiss: true });

    commentsModal.onDidDismiss(data => {

      if (data) {
        this.CommentCount = data.commentsCount;
      }
    });
    commentsModal.present();

  }


  launchMaps() {


    //window.open("http://maps.google.com?daddr=" + this.EventAddress);

    this.launchNavigator.navigate(this.EventAddress).then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );

    //window.open("geo:?q=" + this.EventAddress);


  }

}
