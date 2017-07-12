import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPostActionComponent } from './user-post-action-component';

@NgModule({
  declarations: [
    UserPostActionComponent,
  ],
  imports: [
    IonicPageModule.forChild(UserPostActionComponent),
  ],
  exports: [
    UserPostActionComponent
  ]
})
export class UserPostActionComponentModule {}
