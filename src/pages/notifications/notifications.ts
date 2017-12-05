import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {UserCommentsComponent} from '../../components/user-comments-component/user-comments-component';
import {StoryService} from '../../providers/story-service';
import { storage } from 'firebase';


@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
  providers: [StoryService]
})
export class NotificationsPage {

  public notifications = [];

  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storyService: StoryService,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  ionViewDidEnter(){
    console.log("Inside Notifiation On Enter");
    let notificationString = sessionStorage.getItem("userNotification");

    

    if(notificationString != null && notificationString.length > 3){
      this.notifications = JSON.parse(notificationString);
      console.log("All Notifications");
      console.log(notificationString);
    }

    //this.notifications = [{"storyID":"1430","google.sent_time":1512245779130,"tap":true,"from":"/topics/1430","text":"sdsds","timestamp":"12/2/2017 12:16:19 PM","title":"Saddie West","google.message_id":"0:1512245779448176%36e44fec36e44fec","collapse_key":"com.ionicframework.communities54283"},{"storyID":"1430","google.sent_time":1512245776812,"tap":true,"from":"/topics/1430","text":"sdsdd","timestamp":"12/2/2017 12:16:16 PM","title":"Saddie West","google.message_id":"0:1512245777141663%36e44fec36e44fec","collapse_key":"com.ionicframework.communities54283"}];
  }

  notificationClicked(storyID){    
  
    this.storyService.GetStory(storyID).subscribe(story=>{
      if(story != null){
        let type = story.MediaType;
        
        let postMediaURL;  

        if(type == "Image" && story.Images.length > 0){
          postMediaURL = story.Images;
        }
        else if(type== "Video" && story.Video != null){
          postMediaURL = story.Video.VideoIdentifier;
        }


        let commentsModal = this.modalCtrl.create(UserCommentsComponent,
          { storyID: storyID, postMediaURL: postMediaURL, postMessage: story.LongDescription, storyExternalURL: story.StoryExternalURL, type: type },
          { showBackdrop: true, enableBackdropDismiss: true });

          
   
          commentsModal.present();


      }
    })  
  }
}
