import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityItemComponent } from './community-item';

@NgModule({
  declarations: [
    CommunityItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(CommunityItemComponent),
  ],
  exports: [
    CommunityItemComponent
  ],
  entryComponents: [
    CommunityItemComponent
  ]
})
export class CommunityItemComponentModule {}
