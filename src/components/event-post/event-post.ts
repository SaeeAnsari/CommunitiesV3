import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { UserCommentsComponent } from '../user-comments-component/user-comments-component';

import { ModalController, NavParams } from 'ionic-angular';


import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the EventPostComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'event-post',
  templateUrl: 'event-post.html',
  providers: [InAppBrowser]
})
export class EventPostComponent implements OnInit {
  
   @Input() Address: string;
   @Input() City: string;
    @Input() PostMessage: string;
    @Input() PostMediaURL: string;
    @Input() EventID: number;
    @Input() UserID: number;
    @Input() StoryExternalURL: string;
    @Input() ImageURL;
  
    public fixedImagesforStory;
  
    
  constructor(
    public modalCtrl: ModalController,
    private iab: InAppBrowser
  ) { }

  
  ngOnInit() {
   
  }

  viewCommentsClicked() {
    
  }


  //Type : Video or Image
  openComments() {
    if(this.StoryExternalURL != ""){
      const browser = this.iab.create(this.StoryExternalURL);
    }
  }
}
