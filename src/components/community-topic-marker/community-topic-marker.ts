import { Component, Input, OnInit } from '@angular/core';
import { CommunityPage } from '../../pages/community/community';
import { PopoverController, NavController, NavParams, AlertController} from 'ionic-angular';
import { CreateTopicComponent } from '../../components/create-topic/create-topic';
import { ViewTopicsComponent } from '../../components/view-topics/view-topics';
import { SocialSharingPopoverComponent } from '../../components/social-sharing-popover/social-sharing-popover';
import { CommunityService } from '../../providers/community-service';
import {LiveFeed} from '../../pages/live-feed/live-feed';
import {TabsPage} from '../../pages/tabs/tabs';

/**
 * Generated class for the CommunityTopicMarkerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'community-topic-marker',
  templateUrl: 'community-topic-marker.html',
  providers: [CommunityService]
})
export class CommunityTopicMarkerComponent implements OnInit {

  ionViewDidEnter() {

  }

  ngOnInit(): void {
    if (this.CommunityID > 0) {

      let userID = +sessionStorage.getItem('userID');

      this._communityService.GetCommunity(this.CommunityID).subscribe(sub => {

        if (sub.Type == 3 || sub.OwnerID != userID) { //Hide if in the Topic or not the Owner of the Community
          this.hideCreate = true;
        }

        if (sub.Type == 2) {//hide for the cities
          this.hideButtons = false;
        }

        if(sub.OwnerID == userID && sub.Type != 1){
          this.showDelete = true; //Only show delete if the owner is logged in and its not a City
        }
      });
    }
  }


  @Input() CommunityID;
  private communityCreated: boolean = false;
  private hideButtons: boolean = true;
  private hideCreate: boolean = false;
  private showDelete: boolean = false;

  constructor(

    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private _communityService: CommunityService,
    private alertCtrl: AlertController
  ) {

  }

  createTopic(myEvent) {

    let createTopic = this.popoverCtrl.create(CreateTopicComponent, { CommunityID: this.CommunityID });

    if (this.CommunityID > 0) {

      createTopic.onDidDismiss(data => {

        if (data != null && data.CommunityID > 0) {
          this.communityCreated = true;
          setTimeout(() => {
            this.communityCreated = false;
          }, 5000);
        }
      })
      createTopic.present({
        ev: myEvent
      });

    }
  }

  viewTopics(myEvent) {
    let viewTopic = this.popoverCtrl.create(ViewTopicsComponent, { CommunityID: this.CommunityID });

    if (this.CommunityID > 0) {

      viewTopic.present({
        ev: myEvent
      });

    }
  }

  presentConfirmDelate() {
    let alert = this.alertCtrl.create({
      title: 'Delete?',
      message: 'Deleting cannot be undone, are you sure you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked');
            this._communityService.DeleteCommunity(this.CommunityID).subscribe(sub=>{
              if(sub != null){
                if(sub == -1){
                  this.navCtrl.push(TabsPage);
                }
                else if(sub > 0){
                  this.navCtrl.push(LiveFeed, {communityID: sub});
                }
              }
            });
          }
        }
      ]
    });
    alert.present();
  }
}
