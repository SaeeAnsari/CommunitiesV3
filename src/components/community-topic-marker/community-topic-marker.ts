import { Component, Input } from '@angular/core';
import { CommunityPage } from '../../pages/community/community';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CommunityTopicMarkerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'community-topic-marker',
  templateUrl: 'community-topic-marker.html'
})
export class CommunityTopicMarkerComponent {


  @Input() CommunityID:number;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
  }

  createTopic(){

    if(this.CommunityID > 0){
      this.navCtrl.push(CommunityPage, {communityID: this.CommunityID});     
    }
    
  }
}
