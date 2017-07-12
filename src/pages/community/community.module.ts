import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityPage } from './community';

@NgModule({
  declarations: [
    CommunityPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityPage),
  ],
  exports: [
    CommunityPage
  ]
})
export class CommunityModule {}
