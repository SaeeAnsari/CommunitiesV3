import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { UserPost } from '../../interfaces/user-post';
import { StoryService } from '../../providers/story-service';
import { CommunityService } from '../../providers/community-service';
import { UserService } from '../../providers/user-service';

import { CommunityPage } from '../../pages/community/community';


import { UserSearchComponent } from '../user-search-component/user-search-component';






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

  private posts = [];
  private communityID: number = 0;
  private pageIndex: number = 1;
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
    this.pageIndex = 1;
    this.posts = [];
    this._storyService.GetStoriesByCommunity(this.communityID, this.pageIndex)
      .subscribe(postS => {
        if (postS.length > 0)
          this.pageIndex = this.pageIndex + 1;

        postS.forEach(element => {

          this.posts.push({
            storyID: element.ID,
            title: element.Title,
            text: element.LongDescription,
            imageURL: element.MediaType == 'Video' ? element.Video.VideoIdentifier : this.getImageURLTransformed(element.ImageURL),
            likeCount: element.ActionSummary.SupportCount,
            dislikeCount: element.ActionSummary.DisagreeCount,
            commentsCount: element.ActionSummary.CommentCount,
            totalViews: element.ActionSummary.ViewCount,
            userID: element.StoryUser.ID,
            postDate: element.Timestamp,
            userProfileImage: element.StoryUser.ImageURL.replace('/upload/','/upload/w_40,h_40,c_thumb,r_max/'),
            userFullName: element.StoryUser.DisplayName,
            storyExternalURL: element.StoryExternalURL,
            mediaType: element.MediaType,
            images: element.Images,
            eventID: element.EventID == undefined? 0: element.EventID
          });
        });

      });
  }

  getImageURLTransformed(img:string ): string{
    if(img != null){
      return img.replace('/upload/','/upload/h_800,c_scale/');    
    }
    else{
      return '';
    }
  }

  ngOnInit() {
    if (this.navParams.get('communityID')) {
      this.communityID = this.navParams.get('communityID');
    }    
  }

  ionViewDidEnter(){
  
    if (this.navParams.get('communityID')) {
      this.communityID = this.navParams.get('communityID');

    }
    /*else if (sessionStorage.getItem('activeCommunity')) {
      this.communityID = parseInt(sessionStorage.getItem('activeCommunity'));

    }*/
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

  BootstrapFeed() {
    this.getCommunityDetails();
    this.loadStories();
  }

  StorySaved() {
    this.loadStories();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LiveFeed');
  }

  editCommunities() {
    this.navCtrl.push(CommunityPage, { communityID: this.communityID });
  }

  dynamicLoadStories(): Promise<any> {


    return new Promise((resolve) => {
      setTimeout(() => {

        this._storyService.GetStoriesByCommunity(this.communityID, this.pageIndex)
          .subscribe(postS => {

            if (postS.length > 0) {
              this.pageIndex = this.pageIndex + 1;
            }

            postS.forEach(element => {

              this.posts.push({
                storyID: element.ID,
                title: element.Title,
                text: element.LongDescription,
                imageURL: element.MediaType == 'Video' ? element.Video.VideoIdentifier : element.ImageURL,
                likeCount: element.ActionSummary.SupportCount,
                dislikeCount: element.ActionSummary.DisagreeCount,
                commentsCount: element.ActionSummary.CommentCount,
                totalViews: element.ActionSummary.ViewCount,
                userID: element.StoryUser.ID,
                postDate: element.Timestamp,
                userProfileImage: element.StoryUser.ImageURL,
                userFullName: element.StoryUser.DisplayName,
                storyExternalURL: element.StoryExternalURL,
                mediaType: element.MediaType,
                images: element.Images
              });
            });
          });



        resolve();
      }, 500);
    })
  }

  addUserToCommunity() {

    this.navCtrl.push(UserSearchComponent, { communityID: this.communityID });
  }

}
