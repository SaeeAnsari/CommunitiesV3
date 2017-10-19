import { Component,  Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the EventPostComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'event-post',
  templateUrl: 'event-post.html',
  providers: [InAppBrowser]
})
export class EventPostComponent {
  
   @Input() Address: string;
   @Input() City: string;
    @Input() PostMessage: string;
    @Input() PostMediaURL: string;
    @Input() EventID: number;
    @Input() UserID: number;
    @Input() StoryExternalURL: string;
    @Input() ImageURL;
  
    public fixedImagesforStory;
  
    
  constructor(
    private iab: InAppBrowser
  ) { }

  
  viewCommentsClicked() {
    
  }


  //Type : Video or Image
  openComments() {
    if(this.StoryExternalURL != ""){
      this.iab.create(this.StoryExternalURL);
    }
  }
}
