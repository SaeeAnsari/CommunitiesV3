import { Component, OnInit, Input } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ViewController, NavParams } from 'ionic-angular';
import { StoryService } from '../../providers/story-service';
import { CommunityService } from '../../providers/community-service';
import { UserService } from '../../providers/user-service';
import {ID_Name_Pair} from '../../interfaces/id-name-list';


/**
 * Generated class for the SocialSharingPopoverComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'social-sharing-popover',
  templateUrl: 'social-sharing-popover.html',
  providers: [SocialSharing, StoryService, CommunityService, UserService]
})

export class SocialSharingPopoverComponent implements OnInit {

  text: string;
  private storyID: number;
  userCommunity: ID_Name_Pair[] = [];
  mediaType: string;

  ngOnInit(): void {
    
      this.loadUserCommunities();
    
  }

  constructor(
    private viewController: ViewController,
    private socilaSharing: SocialSharing,
    private navParams: NavParams,
    private storyService: StoryService,
    private communityService: CommunityService,
    private userService: UserService
  ) {
    if (this.navParams.get("storyID")) {
      this.storyID = this.navParams.get("storyID");
    }

    if(this.navParams.get("mediaType")){
      this.mediaType = this.navParams.get("mediaType");
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

  loadUserCommunities() {

    this.userService.getLoggedinInUser().subscribe(s => {
      let userID = s.ID;

      this.communityService.GetUserCommunities(userID).subscribe(c => {
        
        c.forEach(element => {

          var pair: ID_Name_Pair = {id: element.ID, name: element.Name};
          this.userCommunity.push(pair);
        });
      });      
    });
  }

  onShareClick(id){

    this.userService.getLoggedinInUser().subscribe(s => {
      let userID = s.ID;

        this.storyService.ShareStory(this.storyID, userID, id).subscribe(sub=>{
          if(sub == true){
            console.log("Share Successful!");            
          }
        });
    });
    
    this.viewController.dismiss();
  }
}
