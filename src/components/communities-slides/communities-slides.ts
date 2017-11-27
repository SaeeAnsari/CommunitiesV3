import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { CommunityService } from '../../providers/community-service';
import { LiveFeed } from '../../pages/live-feed/live-feed';


/**
 * Generated class for the CommunitiesSlidesComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'communities-slides',
  templateUrl: 'communities-slides.html',
  providers: [CommunityService, UserService]
})
export class CommunitiesSlidesComponent implements OnInit {

  searchItems = [];

  constructor(
    private _userService: UserService,
    private _searchService: CommunityService,
    public navCtrl: NavController
  ) {

  }

  ngOnInit(): void {

    var  activeCommunityID = sessionStorage.getItem("activeCommunity");

    //this._userService.getLoggedinInUser().subscribe(s => {
      
    let userID = this._userService.GetLoggedInUserID();

      this._searchService.GetUserRegisteredCommunities(userID)
        .subscribe(sub => {

          sub.forEach(element => {

          if(activeCommunityID != element.ID)
          {
          
            var community = {
              id: element.ID,
              name: element.Name,
              description: element.Description,
              ownerID: element.OwnerID,
              typeName: 'City',
              imageURL: element.ImageURL
            };

            this.searchItems.push(community);
          }
          });
        });
    //});

  }

  goToCommunity(communityID) {
    if (communityID > 0) {



        let userID: number = this._userService.GetLoggedInUserID();
        this._searchService.UpdateCommunityRank(communityID, userID).subscribe();
      

      //sessionStorage.setItem('activeCommunity', communityID);
      this.navCtrl.push(LiveFeed, { communityID: communityID });
    }
  }

}
