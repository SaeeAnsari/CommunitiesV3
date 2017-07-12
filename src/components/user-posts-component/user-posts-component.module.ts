import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPostsComponent } from './user-posts-component';

@NgModule({
  declarations: [
    UserPostsComponent,
  ],
  imports: [
    IonicPageModule.forChild(UserPostsComponent),
  ],
  exports: [
    UserPostsComponent
  ]
})
export class UserPostsComponentModule {}
