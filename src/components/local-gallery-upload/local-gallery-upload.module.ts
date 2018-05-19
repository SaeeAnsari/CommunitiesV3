import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LocalGalleryUploadComponent } from './local-gallery-upload';

@NgModule({
  declarations: [
    LocalGalleryUploadComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    LocalGalleryUploadComponent
  ],
  entryComponents: [
    LocalGalleryUploadComponent
  ]
})
export class LocalGalleryUploadComponentModule {}
