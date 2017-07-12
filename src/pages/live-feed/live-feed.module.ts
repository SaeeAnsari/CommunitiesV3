import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiveFeed } from './live-feed';

@NgModule({
  declarations: [
    LiveFeed,
  ],
  imports: [
    IonicPageModule.forChild(LiveFeed),
  ],
  exports: [
    LiveFeed
  ]
})
export class LiveFeedModule {}
