import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { UserPost } from '../../interfaces/user-post';
import { StoryService } from '../../providers/story-service';
import { CommunityService } from '../../providers/community-service';
import { UserService } from '../../providers/user-service';

import {CommunityPage} from '../../pages/community/community';






/**
 * Generated class for the LiveFeed page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-live-feed',
  templateUrl: 'live-feed.html',
  providers: [StoryService, CommunityService, UserService]
})
export class LiveFeed implements OnInit {

  private userID: number;
  private posts: UserPost[] = [];
  private subscription;
  private communityID: number = 0;
  private pageIndex: number = 0;
  private communityName: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _storyService: StoryService,
    private _communityService: CommunityService,
    private _userService: UserService,
    public modalCtrl: ModalController
    ) {



  }


  getCommunityDetails() {
    this._communityService.GetCommunity(this.communityID)
      .subscribe(sub => {
        this.communityName = sub.Name;
      })
  }

  loadStories() {
    this.posts = [];
    this._storyService.GetStoriesByCommunity(this.communityID, this.pageIndex)
      .subscribe(postS => {

        postS.forEach(element => {

          if(element.ID == 1066){
            let xy = 0;
          }

          this.posts.push({
            storyID: element.ID,
            title: element.Title,
            text: element.LongDescription,
            imageURL: element.ImageURL,
            likeCount: element.ActionSummary.SupportCount,
            dislikeCount: element.ActionSummary.DisagreeCount,
            commentsCount: element.ActionSummary.CommentCount,
            totalViews: element.ActionSummary.ViewCount,
            userID: element.StoryUser.ID,
            postDate: element.Timestamp,
            userProfileImage: element.StoryUser.ImageURL,
            userFullName: element.StoryUser.DisplayName,
            storyExternalURL: element.StoryExternalURL 
          });
        });
      });
  }

  ngOnInit() {

    if (this.navParams.get('communityID')) {
      this.communityID = this.navParams.get('communityID');

    }
    else if (sessionStorage.getItem('activeCommunity')) {
      this.communityID = parseInt(sessionStorage.getItem('activeCommunity'));

    }
    else {
      this._userService.getLoggedinInUser().subscribe(sub => {

        this.communityID = sub.DefaultCommunityID;
        this.BootstrapFeed();
      });
    }

    if (this.communityID > 0) {
      this.BootstrapFeed();
    }
  }

  BootstrapFeed(){
    this.getCommunityDetails();
    this.loadStories();
  }

  StorySaved() {
    this.loadStories();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LiveFeed');
  }

  editCommunities(){
    this.navCtrl.push(CommunityPage, {communityID: this.communityID});
  }


}
