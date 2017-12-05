import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import {CommunityService} from '../../providers/community-service';
import {LiveFeed} from '../../pages/live-feed/live-feed'

/**
 * Generated class for the CommunityItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'community-item',
  templateUrl: 'community-item.html',
  providers: [UserService, CommunityService]
})
export class CommunityItemComponent implements OnInit {
  ngOnInit(): void {
    if (this.ImageURL == undefined || this.ImageURL == "") {
      this.ImageURL = "https://cdn2.iconfinder.com/data/icons/flat-ui-free/128/Chat.png";
    }

    if (this.Member == "true") {
      this.buttonText = "View"
    }
    else {
      this.buttonText = "Join";
    }
  }


  @Input() HeaderText = "";
  @Input() BodyText = "";
  @Input() ID;
  @Input() Member;
  @Input() ImageURL;
  @Input() UserCount;

  @Output() CommunityChanged = new EventEmitter();

  private buttonText: string;

  private existingUser: boolean = false;


  constructor(
    private _userService: UserService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public _communityService: CommunityService) {

  }

  joinCommunity() {
    this._userService.getLoggedinInUser().subscribe(sub => {

      let userID: number = sub.ID;

      this._userService.AddUsertoCommunity(userID, this.ID).subscribe(sub => {
        this.existingUser = true;
        this.CommunityChanged.emit({ communityID: this.ID, isMember: this.Member });
      });
    });
  }


  leaveCommunity() {
    this._userService.getLoggedinInUser().subscribe(sub => {

      let userID: number = sub.ID;

      this._userService.RemoveUserFromCommunity(userID, this.ID).subscribe(sub => {
        this.existingUser = true;
        this.CommunityChanged.emit({ communityID: this.ID, isMember: this.Member });
      });
    });
  }

  navigate() {

    this._userService.getLoggedinInUser().subscribe(sub => {

      let userID: number = sub.ID;
      this._communityService.UpdateCommunityRank(this.ID, userID).subscribe();     
    });

    if (this.Member == "true") {
      //sessionStorage.setItem('activeCommunity', this.ID);
      this.navCtrl.push(LiveFeed, { communityID: this.ID });
    }
  }
}
