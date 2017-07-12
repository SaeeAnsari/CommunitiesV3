import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserCommentsComponent } from './user-comments-component';

@NgModule({
  declarations: [
    UserCommentsComponent,
  ],
  imports: [
    IonicPageModule.forChild(UserCommentsComponent),
  ],
  exports: [
    UserCommentsComponent
  ]
})
export class UserCommentsComponentModule {}
