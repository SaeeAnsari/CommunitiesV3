import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { EventProvider } from '../../providers/event/event';
import { UserService } from '../../providers/user-service';





/**
 * Generated class for the EventFeedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-feed',
  templateUrl: 'event-feed.html',
  providers: [EventProvider, UserService]
})
export class EventFeedPage implements OnInit {

  private userID: number;
  private posts = [];
  private nextPageIndex: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _eventService: EventProvider,
    private _userService: UserService,
    public modalCtrl: ModalController
  ) {



  }


  loadEvents() {
    this.nextPageIndex = 0;
    this.posts = [];
    this._eventService.GetEventsByUser(this.userID, this.nextPageIndex)
      .subscribe(postS => {
        if (postS.length > 0)
          this.nextPageIndex = this.nextPageIndex + 1;

        postS.forEach(element => {

          this.posts.push({
            eventID: element.ID,
            name: element.Name,
            title: element.Title,
            text: element.Description,
            imageURL: element.ImageURL,
            userID: element.EventUser.ID,
            postDate: element.Timestamp,
            userProfileImage: element.EventUser.ImageURL,
            userFullName: element.EventUser.DisplayName,
            storyExternalURL: element.Link,
            mediaType: element.MediaType,
            address: element.Address,
            city: element.City,
            eventStartDate: element.EventStartDate,
            eventEndDate: element.EventEndDate
          });
        });
      });
  }

  ngOnInit() {}
  
  ionViewDidEnter(){

    

      this.userID = this._userService.GetLoggedInUserID();
      this.BootstrapFeed();
    
  }

  BootstrapFeed() {
    this.loadEvents();
  }

  StorySaved() {
    this.loadEvents();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LiveFeed');
  }


  dynamicLoadEvents(): Promise<any> {


    return new Promise((resolve) => {
      setTimeout(() => {

        this._eventService.GetEventsByUser(this.userID, this.nextPageIndex)
          .subscribe(postS => {

            if (postS.length > 0) {
              this.nextPageIndex = this.nextPageIndex + 1;
            }

            postS.forEach(element => {

              this.posts.push({
                eventID: element.ID,
                name: element.Name,
                title: element.Title,
                text: element.Description,
                imageURL: element.ImageURL,
                userID: element.EventUser.ID,
                postDate: element.Timestamp,
                userProfileImage: element.EventUser.ImageURL,
                userFullName: element.EventUser.DisplayName,
                storyExternalURL: element.StoryExternalURL,
                mediaType: element.MediaType
              });
            });
          });



        resolve();
      }, 500);
    })
  }

}
