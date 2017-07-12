import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventFeedPage } from './event-feed';

@NgModule({
  declarations: [
    EventFeedPage,
  ],
  imports: [
    IonicPageModule.forChild(EventFeedPage),
  ],
  exports: [
    EventFeedPage
  ]
})
export class EventFeedPageModule {}
