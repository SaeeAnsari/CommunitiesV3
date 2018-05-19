import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityPage } from './community';
import {LocalGalleryUploadComponentModule} from '../../components/local-gallery-upload/local-gallery-upload.module';

@NgModule({
  declarations: [
    CommunityPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityPage),
    LocalGalleryUploadComponentModule
  ],
  exports: [
    CommunityPage
  ]
})
export class CommunityModule {}
