import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCommunitiesPage } from './my-communities';

@NgModule({
  declarations: [
    MyCommunitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCommunitiesPage),
  ],
  exports: [
    MyCommunitiesPage
  ]
})
export class MyCommunitiesPageModule {}
