import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ViewController, NavParams } from 'ionic-angular';
import { StoryService } from '../../providers/story-service';

/**
 * Generated class for the SocialSharingPopoverComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'social-sharing-popover',
  templateUrl: 'social-sharing-popover.html',
  providers: [SocialSharing, StoryService]
})
export class SocialSharingPopoverComponent {

  text: string;
  private storyID: number;

  constructor(
    private viewController: ViewController,
    private socilaSharing: SocialSharing,
    private navParams: NavParams,
    private storyService: StoryService) {
    if (this.navParams.get("storyID")) {
      this.storyID = this.navParams.get("storyID");
    }
  }

  shareFaceBook() {

    this.storyService.GetStory(this.storyID).subscribe(sub => {

      console.log("Sharing on FB: " + sub.LongDescription);

      this.socilaSharing.shareViaFacebook(sub.LongDescription, sub.ImageURL, sub.StoryExternalURL).then((data) => {
        this.viewController.dismiss();
      })
    });
  }
  shareWhatsApp() {
    this.storyService.GetStory(this.storyID).subscribe(sub => {

      this.socilaSharing.shareViaWhatsApp(sub.LongDescription, sub.ImageURL, sub.StoryExternalURL).then((data) => {
        this.viewController.dismiss();
      })
    });
  }
}
