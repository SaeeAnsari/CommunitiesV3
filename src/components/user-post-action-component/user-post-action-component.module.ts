import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPostActionComponent } from './user-post-action-component';
import {SocialSharingPopoverComponentModule} from '../../components/social-sharing-popover/social-sharing-popover.module';

@NgModule({
  declarations: [
    UserPostActionComponent,
  ],
  imports: [
    IonicPageModule.forChild(UserPostActionComponent),
    SocialSharingPopoverComponentModule
  ],
  exports: [
    UserPostActionComponent
  ],
  entryComponents: [
    UserPostActionComponent
  ]
})
export class UserPostActionComponentModule {}
