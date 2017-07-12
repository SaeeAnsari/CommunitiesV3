import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MediaDisplayPage } from './media-display';

@NgModule({
  declarations: [
    MediaDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(MediaDisplayPage),
  ],
  exports: [
    MediaDisplayPage
  ]
})
export class MediaDisplayPageModule {}
