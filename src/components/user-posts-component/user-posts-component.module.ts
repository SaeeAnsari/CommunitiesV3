import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPostsComponent } from './user-posts-component';
import {UserPostActionComponentModule} from '../../components/user-post-action-component/user-post-action-component.module';

@NgModule({
  declarations: [
    UserPostsComponent,
  ],
  imports: [
    IonicPageModule.forChild(UserPostsComponent),
    UserPostActionComponentModule
  ],
  exports: [
    UserPostsComponent
  ],
  entryComponents: [
    UserPostsComponent
  ]
})
export class UserPostsComponentModule {}
