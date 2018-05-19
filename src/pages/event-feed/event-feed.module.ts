import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventFeedPage } from './event-feed';
import {MarkerNewPostComponentModule} from '../../components/marker-new-post-component/marker-new-post-component.module';
import {UserTagComponentModule} from '../../components/user-tag-component/user-tag-component.module';
import {EventPostComponentModule} from '../../components/event-post/event-post.module';

@NgModule({
  declarations: [
    EventFeedPage,
  ],
  imports: [
    IonicPageModule.forChild(EventFeedPage),
    MarkerNewPostComponentModule,
    UserTagComponentModule,
    EventPostComponentModule
  ],
  exports: [
    EventFeedPage
  ]
})
export class EventFeedPageModule {}
