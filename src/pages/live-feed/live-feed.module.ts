import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiveFeed } from './live-feed';
import { CommunitiesSlidesComponentModule } from '../../components/communities-slides/communities-slides.module';
import { CommunityTopicMarkerComponentModule } from '../../components/community-topic-marker/community-topic-marker.module';
import {MarkerNewPostComponentModule} from '../../components/marker-new-post-component/marker-new-post-component.module';
import {UserTagComponentModule} from '../../components/user-tag-component/user-tag-component.module';
import {UserPostsComponentModule} from '../../components/user-posts-component/user-posts-component.module';


@NgModule({
  declarations: [
    LiveFeed,
  ],
  imports: [
    IonicPageModule.forChild(LiveFeed),
    CommunitiesSlidesComponentModule,
    CommunityTopicMarkerComponentModule,
    MarkerNewPostComponentModule,
    UserTagComponentModule,
    UserPostsComponentModule
  ],
  exports: [
    LiveFeed
  ]
})
export class LiveFeedModule {}
