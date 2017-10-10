import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { UserCommentsComponent } from '../user-comments-component/user-comments-component';

import { ModalController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventPostComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'event-post',
  templateUrl: 'event-post.html'
})
export class EventPostComponent implements OnInit {
  
    @Input() PostMessage: string;
    @Input() PostMediaURL: string;
    @Input() EventID: number;
    @Input() UserID: number;
    @Input() StoryExternalURL: string;
    @Input() ImageURL;
  
    public fixedImagesforStory;
  
    
  constructor(
    public modalCtrl: ModalController
  ) { }

  
  ngOnInit() {
   
  }

  viewCommentsClicked() {
    
  }


  //Type : Video or Image
  openComments(type) {

  }
}
