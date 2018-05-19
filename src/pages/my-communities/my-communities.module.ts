import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCommunitiesPage } from './my-communities';
import {CommunityItemComponentModule} from '../../components/community-item/community-item.module';

@NgModule({
  declarations: [
    MyCommunitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCommunitiesPage),
    CommunityItemComponentModule
  ],
  exports: [
    MyCommunitiesPage
  ]
})
export class MyCommunitiesPageModule {}
