import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../providers/community-service';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import {LiveFeed} from '../../pages/live-feed/live-feed';


/**
 * Generated class for the ViewTopicsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'view-topics',
  templateUrl: 'view-topics.html',
  providers: [CommunityService]
})
export class ViewTopicsComponent implements OnInit {
  
  
  ngOnInit(): void {

    if (this.CommunityID > 0) {

      this._communityService.GetCommunityTopics(this.CommunityID).subscribe(sub => {

        if(sub.length > 0){
          sub.forEach(element => {
            this.topics.push({ID: element.ID, Name: element.Name});
          });
        }
      });
    }
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LiveFeed');
  }

  private CommunityID: number = 0;
  private topics = [];

  constructor(
    private _communityService: CommunityService,
    private viewController: ViewController,
    private navParams: NavParams,
    public navCtrl: NavController,
  ) {

    if (this.navParams.get("CommunityID")) {
      this.CommunityID = this.navParams.get("CommunityID");
    }

  }

  launchTopic(communityID:number){
    this.navCtrl.push(LiveFeed, { communityID: communityID })
  }
}
